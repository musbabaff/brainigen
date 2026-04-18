import { Button, Heading, Section, Text, Row, Column } from "@react-email/components";
import * as React from "react";
import { BaseEmail } from "./BaseEmail";

export const MonthlyDigestEmail = ({ 
  month = "April",
  totalMessages = "14,285",
  topAgent = "Support Bot",
  newFeatureUrl = "https://brainigen.com/changelog"
}: { 
  month?: string;
  totalMessages?: string;
  topAgent?: string;
  newFeatureUrl?: string;
}) => {
  return (
    <BaseEmail previewText={`Your Brainigen month in review - ${month}`}>
      <Heading className="heading text-[24px] font-bold tracking-tight mb-[16px] m-0">
        Your {month} in Review 📊
      </Heading>
      
      <Text className="text text-[15px] leading-[24px] mb-[24px]">
        Here's a quick look at how your agents performed this month.
      </Text>

      <Section className="mb-[32px]">
        <Row className="mb-[16px]">
          <Column className="w-1/2 pr-[8px]">
            <div className="bg-brand/5 border border-brand/20 rounded-lg p-[16px] text-center">
              <Text className="m-0 text-[24px] font-bold text-brand mb-[4px]">{totalMessages}</Text>
              <Text className="m-0 text-[12px] text-muted-foreground uppercase tracking-wider font-semibold">Total Messages</Text>
            </div>
          </Column>
          <Column className="w-1/2 pl-[8px]">
            <div className="bg-brand/5 border border-brand/20 rounded-lg p-[16px] text-center">
              <Text className="m-0 text-[16px] font-bold text-brand mb-[4px] leading-[36px]">{topAgent}</Text>
              <Text className="m-0 text-[12px] text-muted-foreground uppercase tracking-wider font-semibold">Top Agent</Text>
            </div>
          </Column>
        </Row>
      </Section>

      <Heading className="heading text-[18px] font-bold tracking-tight mb-[12px] m-0">
        New this month
      </Heading>
      <Text className="text text-[15px] leading-[24px] mb-[16px]">
        We've added multi-agent workflows, improved streaming speed by 40%, and introduced 5 new tool integrations.
      </Text>

      <Section className="mb-[24px]">
        <Button
          href={newFeatureUrl}
          className="bg-muted text-foreground border border-border text-[14px] font-semibold px-[24px] py-[12px] rounded-lg text-center"
        >
          View Full Changelog
        </Button>
      </Section>
    </BaseEmail>
  );
};
