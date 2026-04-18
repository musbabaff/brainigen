import { Button, Heading, Section, Text, Container } from "@react-email/components";
import * as React from "react";
import { BaseEmail } from "./BaseEmail";

export const TicketReplyEmail = ({ 
  ticketSubject = "Billing Issue", 
  replyPreview = "Hi there, I've looked into your account and...",
  ticketUrl = "https://brainigen.com/dashboard/support/123"
}: { 
  ticketSubject?: string;
  replyPreview?: string;
  ticketUrl?: string;
}) => {
  return (
    <BaseEmail previewText={`Re: ${ticketSubject}`}>
      <Heading className="heading text-[20px] font-bold tracking-tight mb-[16px] m-0">
        New reply to your ticket: "{ticketSubject}"
      </Heading>
      
      <Text className="text text-[15px] leading-[24px] mb-[16px]">
        A Brainigen support team member has replied to your ticket.
      </Text>

      <Section className="bg-muted/30 border border-border rounded-lg p-[16px] mb-[24px]">
        <Text className="text-[14px] leading-[24px] text-muted-foreground italic m-0">
          "{replyPreview}"
        </Text>
      </Section>

      <Section>
        <Button
          href={ticketUrl}
          className="bg-brand text-white text-[14px] font-semibold px-[24px] py-[12px] rounded-lg text-center"
        >
          View Full Conversation
        </Button>
      </Section>
    </BaseEmail>
  );
};
