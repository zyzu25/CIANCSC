import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";
import { db } from "./db";
import { threatReportSchema, recruitmentSchema, feedbackSchema, otherRequestSchema } from "@shared/schema";

interface ContactFormData {
  formType: string;
  formData: any;
  metadata: {
    timestamp: string;
    userAgent: string;
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form API endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const formData: ContactFormData = req.body;
      const ipAddress = req.ip || req.socket.remoteAddress || 'Unknown';
      
      // Validate form data based on form type
      try {
        switch (formData.formType) {
          case 'threat-report':
            threatReportSchema.parse(formData.formData);
            break;
          case 'recruitment':
            recruitmentSchema.parse(formData.formData);
            break;
          case 'feedback':
            feedbackSchema.parse(formData.formData);
            break;
          case 'other-request':
            otherRequestSchema.parse(formData.formData);
            break;
          default:
            throw new Error('Invalid form type');
        }
      } catch (validationError) {
        console.error('Form validation error:', validationError);
        return res.status(400).json({ 
          success: false, 
          message: 'Validation failed', 
          errors: validationError 
        });
      }
      
      // Store the submission in the database
      const submission = await storage.saveContactFormSubmission({
        formType: formData.formType,
        formData: formData.formData,
        ipAddress: ipAddress,
        userAgent: formData.metadata.userAgent,
        sentToDiscord: false
      });
      
      const submissionId = submission.id;
      
      // Discord webhook configuration
      const webhookUrl = 'https://discord.com/api/webhooks/1357420525432995900/CFmIvjjRSPqc-Fo8YQErQArEarQcGDP_pLX3xDlLiw0ouFvVVT8WLRF9blF8cqyt-Q37';
      
      // Get colored embed based on form type
      const embed = getDiscordEmbed(formData, ipAddress, submissionId);
      
      // Send to Discord webhook
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `<@&1355206345544171699> New ${formatFormType(formData.formType)} submission received (#${submissionId})`,
          embeds: [embed],
          avatar_url: "https://i.imgur.com/mI8XcDr.png",
          username: "NCSC Contact System"
        }),
      });
      
      let discordResponseText = '';
      if (webhookResponse.ok) {
        discordResponseText = 'Success';
        // Update the database record to indicate successful Discord webhook delivery
        await storage.updateDiscordStatus(submissionId, true, 'Delivered');
      } else {
        discordResponseText = `Error: ${webhookResponse.statusText}`;
        // Update the database record to indicate failed Discord webhook delivery
        await storage.updateDiscordStatus(submissionId, false, webhookResponse.statusText);
        console.error('Discord webhook error:', webhookResponse.statusText);
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Contact form submitted successfully',
        submissionId,
        discordDelivery: webhookResponse.ok
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({ success: false, message: 'Failed to process contact form' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to format form type for user-friendly display
function formatFormType(formType: string): string {
  switch (formType) {
    case 'threat-report':
      return 'Threat Report';
    case 'recruitment':
      return 'Recruitment Inquiry';
    case 'feedback':
      return 'Website Feedback';
    case 'other-request':
      return 'Other Request';
    default:
      return formType;
  }
}

// Helper function to create Discord embed based on form type
function getDiscordEmbed(formData: ContactFormData, ipAddress: string, submissionId: number) {
  const { formType, formData: data } = formData;
  
  // Base embed structure
  const embed: any = {
    title: `NCSC ${formatFormType(formType)}`,
    timestamp: new Date().toISOString(),
    footer: {
      text: `IP: ${ipAddress} • Submission ID: ${submissionId}`
    },
    thumbnail: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Seal_of_the_National_Counterintelligence_and_Security_Center.svg/1200px-Seal_of_the_National_Counterintelligence_and_Security_Center.svg.png"
    }
  };
  
  // Set color and fields based on form type
  switch (formType) {
    case 'threat-report':
      embed.color = 0xFF2A2A; // Red
      embed.description = `**Incident Report Details**`;
      embed.fields = [
        { name: 'Reporter Info', value: `Discord: ${data.discordUsername}`, inline: true },
        { name: 'Suspect Discord', value: data.suspectDiscord, inline: true },
        { name: 'Incident Time', value: data.incidentTime, inline: false },
        { name: 'Description', value: data.description, inline: false }
      ];
      if (data.evidence) {
        embed.fields.push({ name: 'Evidence URL', value: data.evidence });
      }
      embed.footer.text += ' • ⚠ False reports result in bans';
      break;
      
    case 'recruitment':
      embed.color = 0xFFD700; // Gold
      embed.description = `**NCSC Recruitment Inquiry**`;
      embed.fields = [
        { name: 'Applicant Info', value: `Discord: ${data.discordUsername}\nAge: ${data.age}`, inline: true },
        { name: 'Statement', value: data.statement, inline: false }
      ];
      embed.footer.text += ' • 🔒 Requires background check';
      break;
      
    case 'feedback':
      embed.color = 0x0366D6; // Blue
      embed.description = `**Website Feedback Submitted**`;
      embed.fields = [
        { name: 'Reporter Info', value: `Discord: ${data.discordUsername}`, inline: true },
        { name: 'Page URL', value: data.pageUrl, inline: true },
        { name: 'Description', value: data.description, inline: false }
      ];
      if (data.screenshot) {
        embed.fields.push({ name: 'Screenshot URL', value: data.screenshot });
      }
      embed.footer.text += ' • 🛠️ Technical feedback prioritized';
      break;
      
    case 'other-request':
      embed.color = 0x6A737D; // Gray
      embed.description = `**Other Request Submitted**`;
      embed.fields = [
        { name: 'Requester Info', value: `Discord: ${data.discordUsername}`, inline: true },
        { name: 'Request Type', value: formatRequestType(data.requestType), inline: true },
        { name: 'Justification', value: data.justification, inline: false }
      ];
      embed.footer.text += ' • 📝 Logged for review';
      break;
  }
  
  return embed;
}

// Helper function to format request types
function formatRequestType(requestType: string): string {
  switch (requestType) {
    case 'data-deletion':
      return 'Data Deletion Request';
    case 'press-media':
      return 'Press/Media Inquiry';
    case 'legal-request':
      return 'Legal Matter';
    default:
      return requestType;
  }
}
