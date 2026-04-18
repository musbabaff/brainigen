import { Button, Heading, Section, Text, Row, Column } from "@react-email/components";
import * as React from "react";
import { BaseEmail } from "./BaseEmail";

export const SubscriptionRenewalEmail = ({ 
  plan = "Pro", 
  date = new Date(Date.now() + 3 * 86400000).toLocaleDateString(),
  amount = "$29.00",
  manageUrl = "https://brainigen.com/dashboard/billing"
}: { 
  plan?: string;
  date?: string;
  amount?: string;
  manageUrl?: string;
}) => {
  return (
    <BaseEmail previewText="Your plan renews in 3 days">
      <Heading className="heading text-[24px] font-bold tracking-tight mb-[16px] m-0">
        Upcoming Subscription Renewal
      </Heading>
      
      <Text className="text text-[15px] leading-[24px] mb-[24px]">
        Just a quick heads up! Your Brainigen {plan} subscription will automatically renew in 3 days.
      </Text>

      <Section className="border border-border rounded-lg p-[16px] mb-[32px] bg-muted/30">
        <Row className="mb-[8px]">
          <Column><Text className="text-muted-foreground m-0 text-[14px]">Renewal Date</Text></Column>
          <Column align="right"><Text className="font-medium m-0 text-[14px]">{date}</Text></Column>
        </Row>
        <Row>
          <Column><Text className="font-semibold m-0 text-[14px]">Amount</Text></Column>
          <Column align="right"><Text className="font-bold text-brand m-0 text-[16px]">{amount}</Text></Column>
        </Row>
      </Section>

      <Text className="text text-[14px] text-muted-foreground mb-[24px]">
        No action is required if you wish to continue. The card on file will be charged automatically.
      </Text>

      <Section>
        <Button
          href={manageUrl}
          className="bg-transparent border border-border text-foreground text-[14px] font-semibold px-[24px] py-[12px] rounded-lg text-center"
        >
          Manage Subscription
        </Button>
      </Section>
    </BaseEmail>
  );
};
