import { Button, Heading, Section, Text, Row, Column } from "@react-email/components";
import * as React from "react";
import { BaseEmail } from "./BaseEmail";

export const UsageLimitWarningEmail = ({ 
  percent = 80,
  currentUsage = "8,000",
  limit = "10,000",
  upgradeUrl = "https://brainigen.com/dashboard/billing"
}: { 
  percent?: number;
  currentUsage?: string;
  limit?: string;
  upgradeUrl?: string;
}) => {
  const isExceeded = percent >= 100;
  
  return (
    <BaseEmail previewText={`You're at ${percent}% of your monthly limit`}>
      <Heading className={`heading text-[24px] font-bold tracking-tight mb-[16px] m-0 ${isExceeded ? 'text-destructive' : 'text-amber-500'}`}>
        {isExceeded ? 'Usage Limit Exceeded' : 'Usage Limit Warning'}
      </Heading>
      
      <Text className="text text-[15px] leading-[24px] mb-[24px]">
        You have reached <strong>{percent}%</strong> of your monthly message limit.
      </Text>

      <Section className="border border-border rounded-lg p-[16px] mb-[32px] bg-muted/30">
        <Row className="mb-[16px]">
          <Column><Text className="text-muted-foreground m-0 text-[14px]">Current Usage</Text></Column>
          <Column align="right"><Text className="font-semibold m-0 text-[14px]">{currentUsage} / {limit}</Text></Column>
        </Row>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${isExceeded ? 'bg-destructive' : 'bg-amber-500'}`} 
            style={{ width: `${Math.min(percent, 100)}%` }} 
          />
        </div>
      </Section>

      <Text className="text text-[14px] text-muted-foreground mb-[24px]">
        {isExceeded 
          ? "Your agents will stop responding to new messages. Please upgrade your plan to continue." 
          : "Consider upgrading your plan to ensure uninterrupted service for your agents."}
      </Text>

      <Section>
        <Button
          href={upgradeUrl}
          className="bg-brand text-white text-[14px] font-semibold px-[24px] py-[12px] rounded-lg text-center"
        >
          Upgrade Plan
        </Button>
      </Section>
    </BaseEmail>
  );
};
