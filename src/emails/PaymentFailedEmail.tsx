import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import { BaseEmail } from "./BaseEmail";

export const PaymentFailedEmail = ({ 
  reason = "Card declined", 
  updateUrl = "https://brainigen.com/dashboard/billing"
}: { 
  reason?: string;
  updateUrl?: string;
}) => {
  return (
    <BaseEmail previewText="Payment issue with your Brainigen account">
      <Heading className="heading text-[24px] font-bold tracking-tight mb-[16px] m-0 text-red-500">
        Payment Failed
      </Heading>
      
      <Text className="text text-[15px] leading-[24px] mb-[16px]">
        We couldn't process your recent payment. To keep your agents running smoothly, please update your payment method.
      </Text>

      <Section className="bg-red-50 border border-red-100 rounded-lg p-[16px] mb-[24px] dark:bg-red-950/30 dark:border-red-900/50">
        <Text className="m-0 text-[14px] text-red-600 dark:text-red-400 font-medium">
          Reason: {reason}
        </Text>
      </Section>

      <Text className="text text-[15px] leading-[24px] mb-[24px]">
        Don't worry — we've given you a <strong>3-day grace period</strong> before any services are suspended.
      </Text>

      <Section className="mb-[32px]">
        <Button
          href={updateUrl}
          className="bg-brand text-white text-[14px] font-semibold px-[24px] py-[12px] rounded-lg text-center"
        >
          Update Payment Method
        </Button>
      </Section>
    </BaseEmail>
  );
};
