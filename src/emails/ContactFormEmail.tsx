import { Heading, Section, Text, Row, Column } from "@react-email/components";
import * as React from "react";
import { BaseEmail } from "./BaseEmail";

export const ContactFormEmail = ({ 
  name = "Jane Doe", 
  email = "jane@example.com",
  company = "Acme Corp",
  message = "We're interested in your enterprise plan."
}: { 
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}) => {
  return (
    <BaseEmail previewText={`New inquiry from ${name}`}>
      <Heading className="heading text-[20px] font-bold tracking-tight mb-[24px] m-0">
        New Contact Form Submission
      </Heading>
      
      <Section className="border border-border rounded-lg p-[16px] mb-[24px] bg-muted/30">
        <Row className="mb-[12px]">
          <Column className="w-[100px]"><Text className="text-muted-foreground m-0 text-[14px]">Name:</Text></Column>
          <Column><Text className="font-medium m-0 text-[14px]">{name}</Text></Column>
        </Row>
        <Row className="mb-[12px]">
          <Column className="w-[100px]"><Text className="text-muted-foreground m-0 text-[14px]">Email:</Text></Column>
          <Column><Text className="font-medium m-0 text-[14px]">{email}</Text></Column>
        </Row>
        <Row className="mb-[12px]">
          <Column className="w-[100px]"><Text className="text-muted-foreground m-0 text-[14px]">Company:</Text></Column>
          <Column><Text className="font-medium m-0 text-[14px]">{company || "N/A"}</Text></Column>
        </Row>
      </Section>

      <Heading className="heading text-[16px] font-semibold m-0 mb-[12px]">
        Message:
      </Heading>
      <Section className="bg-white border border-border rounded-lg p-[16px]">
        <Text className="text-[14px] leading-[24px] m-0 whitespace-pre-wrap">
          {message}
        </Text>
      </Section>
    </BaseEmail>
  );
};
