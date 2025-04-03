import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ClassifiedWatermark from './ClassifiedWatermark';

// Form schemas for each contact category
const threatReportSchema = z.object({
  discordUsername: z.string().min(1, "Discord username is required"),
  suspectDiscord: z.string().min(1, "Suspect's Discord username is required"),
  incidentTime: z.string().min(1, "Incident timestamp is required"),
  description: z.string().min(10, "Please provide detailed information about the incident"),
  evidence: z.string().optional(),
});

const recruitmentSchema = z.object({
  discordUsername: z.string().min(1, "Discord username is required"),
  age: z.string()
    .min(1, "Age is required")
    .refine((val) => parseInt(val) >= 14, "You must be at least 14 years old"),
  statement: z.string().min(20, "Please provide a brief statement about why you want to join"),
});

const feedbackSchema = z.object({
  discordUsername: z.string().min(1, "Discord username is required"),
  pageUrl: z.string().min(1, "Page URL is required"),
  description: z.string().min(10, "Please provide detailed information about the issue or suggestion"),
  screenshot: z.string().optional(),
});

const otherRequestSchema = z.object({
  discordUsername: z.string().min(1, "Discord username is required"),
  requestType: z.enum(["data-deletion", "press-media", "legal-request"], {
    required_error: "Please select a request type",
  }),
  justification: z.string().min(20, "Please provide a detailed justification for your request"),
});

type ThreatReportValues = z.infer<typeof threatReportSchema>;
type RecruitmentValues = z.infer<typeof recruitmentSchema>;
type FeedbackValues = z.infer<typeof feedbackSchema>;
type OtherRequestValues = z.infer<typeof otherRequestSchema>;

const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("threat-report");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Initialize forms for each category
  const threatForm = useForm<ThreatReportValues>({
    resolver: zodResolver(threatReportSchema),
    defaultValues: {
      discordUsername: "",
      suspectDiscord: "",
      incidentTime: "",
      description: "",
      evidence: "",
    },
  });

  const recruitmentForm = useForm<RecruitmentValues>({
    resolver: zodResolver(recruitmentSchema),
    defaultValues: {
      discordUsername: "",
      age: "",
      statement: "",
    },
  });

  const feedbackForm = useForm<FeedbackValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      discordUsername: "",
      pageUrl: "",
      description: "",
      screenshot: "",
    },
  });

  const otherRequestForm = useForm<OtherRequestValues>({
    resolver: zodResolver(otherRequestSchema),
    defaultValues: {
      discordUsername: "",
      requestType: "data-deletion",
      justification: "",
    },
  });

  const handleSubmit = async (
    data: ThreatReportValues | RecruitmentValues | FeedbackValues | OtherRequestValues,
    formType: string
  ) => {
    setSubmitting(true);
    setSubmitError(null);
    
    try {
      // Enhanced payload with form type and metadata
      const enhancedPayload = {
        formType,
        formData: data,
        metadata: {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enhancedPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }

      setSubmitSuccess(true);
      toast({
        title: "Message Sent",
        description: "Your message has been successfully delivered to NCSC Command.",
      });

      // Reset form based on type
      if (formType === 'threat-report') threatForm.reset();
      if (formType === 'recruitment') recruitmentForm.reset();
      if (formType === 'feedback') feedbackForm.reset();
      if (formType === 'other-request') otherRequestForm.reset();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-ncsc-pitch-black text-white p-4 md:p-8">
      <ClassifiedWatermark text="TOP SECRET // NCSC-1" />
      
      <div className="max-w-5xl mx-auto mb-12 space-y-6">
        <div className="space-y-2 text-center border-b border-ncsc-threat-red pb-4">
          <h1 className="text-4xl font-bold tracking-tight">CONTACT NCSC COMMAND</h1>
          <p className="text-muted-foreground">Submit secure communications to National Counterintelligence & Security Center.</p>
        </div>

        {submitSuccess && (
          <Alert className="bg-green-900/20 border-green-700 text-white mb-6">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-100">
              Your message has been successfully delivered to NCSC Command. A record of this communication has been preserved.
            </AlertDescription>
          </Alert>
        )}

        {submitError && (
          <Alert className="bg-red-900/20 border-red-700 text-white mb-6">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-100">
              {submitError}
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="threat-report" className="data-[state=active]:bg-ncsc-threat-red">
              Threat Report
            </TabsTrigger>
            <TabsTrigger value="recruitment" className="data-[state=active]:bg-ncsc-recruitment-gold data-[state=active]:text-black">
              Recruitment Inquiry
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-ncsc-feedback-blue">
              Website Feedback
            </TabsTrigger>
            <TabsTrigger value="other-request" className="data-[state=active]:bg-ncsc-request-gray">
              Other Requests
            </TabsTrigger>
          </TabsList>

          {/* Threat Report Form */}
          <TabsContent value="threat-report">
            <Card className="border-4 border-ncsc-threat-red bg-ncsc-dark-gray">
              <CardHeader>
                <CardTitle>Threat Report</CardTitle>
                <CardDescription>
                  Report security threats, suspicious activities, or infiltration attempts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...threatForm}>
                  <form onSubmit={threatForm.handleSubmit((data) => handleSubmit(data, 'threat-report'))} className="space-y-4">
                    <FormField
                      control={threatForm.control}
                      name="discordUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Discord Username</FormLabel>
                          <FormControl>
                            <Input placeholder="YourName#1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={threatForm.control}
                      name="suspectDiscord"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Suspect Discord Username</FormLabel>
                          <FormControl>
                            <Input placeholder="SuspectName#1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={threatForm.control}
                      name="incidentTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Incident Timestamp (UTC)</FormLabel>
                          <FormControl>
                            <Input placeholder="YYYY-MM-DD @ HH:MM UTC" {...field} />
                          </FormControl>
                          <FormDescription>
                            Example: 2025-04-15 @ 14:30 UTC
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={threatForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide detailed information about the incident..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={threatForm.control}
                      name="evidence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Evidence URL (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://imgur.com/yourevidence" {...field} />
                          </FormControl>
                          <FormDescription>
                            Links to screenshots or evidence (5MB max)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-ncsc-threat-red hover:bg-red-700"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : "Submit Threat Report"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="bg-red-900/20 text-sm italic">
                ⚠ False reports may result in permanent server bans.
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Recruitment Inquiry Form */}
          <TabsContent value="recruitment">
            <Card className="border-4 border-ncsc-recruitment-gold bg-ncsc-dark-gray">
              <CardHeader>
                <CardTitle>Recruitment Inquiry</CardTitle>
                <CardDescription>
                  Express interest in joining NCSC operations and personnel.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...recruitmentForm}>
                  <form onSubmit={recruitmentForm.handleSubmit((data) => handleSubmit(data, 'recruitment'))} className="space-y-4">
                    <FormField
                      control={recruitmentForm.control}
                      name="discordUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Discord Username</FormLabel>
                          <FormControl>
                            <Input placeholder="YourName#1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={recruitmentForm.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Age (Must be 14+)</FormLabel>
                          <FormControl>
                            <Input type="number" min="14" placeholder="Your Age" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={recruitmentForm.control}
                      name="statement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brief Statement</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your relevant skills and why you wish to join the NCSC..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-ncsc-recruitment-gold hover:bg-yellow-600 text-black"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : "Apply Here"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="bg-yellow-900/20 text-sm italic">
                🔒 All applications undergo 14-day background checks.
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Website Feedback Form */}
          <TabsContent value="feedback">
            <Card className="border-4 border-ncsc-feedback-blue bg-ncsc-dark-gray">
              <CardHeader>
                <CardTitle>Website Feedback</CardTitle>
                <CardDescription>
                  Report bugs, issues, or suggestions for the NCSC website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...feedbackForm}>
                  <form onSubmit={feedbackForm.handleSubmit((data) => handleSubmit(data, 'feedback'))} className="space-y-4">
                    <FormField
                      control={feedbackForm.control}
                      name="discordUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Discord Username</FormLabel>
                          <FormControl>
                            <Input placeholder="YourName#1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={feedbackForm.control}
                      name="pageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Page URL with Issue</FormLabel>
                          <FormControl>
                            <Input placeholder="https://ncsc.gov/page-with-issue" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={feedbackForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the bug or suggestion in detail..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={feedbackForm.control}
                      name="screenshot"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Screenshot URL (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://imgur.com/yourscreenshot" {...field} />
                          </FormControl>
                          <FormDescription>
                            Link to a screenshot if reporting a visual bug
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-ncsc-feedback-blue hover:bg-blue-700"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : "Submit Feedback"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="bg-blue-900/20 text-sm italic">
                🛠️ Technical feedback prioritized within 48hrs.
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Other Requests Form */}
          <TabsContent value="other-request">
            <Card className="border-4 border-ncsc-request-gray bg-ncsc-dark-gray">
              <CardHeader>
                <CardTitle>Other Requests</CardTitle>
                <CardDescription>
                  Submit data deletion, media inquiries, or legal requests.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...otherRequestForm}>
                  <form onSubmit={otherRequestForm.handleSubmit((data) => handleSubmit(data, 'other-request'))} className="space-y-4">
                    <FormField
                      control={otherRequestForm.control}
                      name="discordUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Discord Username</FormLabel>
                          <FormControl>
                            <Input placeholder="YourName#1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={otherRequestForm.control}
                      name="requestType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Request Type</FormLabel>
                          <FormControl>
                            <select 
                              className="w-full px-3 py-2 rounded-md bg-background border border-input"
                              {...field}
                            >
                              <option value="data-deletion">Data Deletion Request</option>
                              <option value="press-media">Press/Media Inquiry</option>
                              <option value="legal-request">Legal Request</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={otherRequestForm.control}
                      name="justification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Justification</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide detailed information about your request..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-ncsc-request-gray hover:bg-gray-600"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : "Submit Request"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="bg-gray-800/20 text-sm italic">
                📝 All requests are logged and reviewed by NCSC personnel.
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContactPage;