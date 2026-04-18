import { Button, Heading, Section, Text, Row, Column } from "@react-email/components";
import * as React from "react";
import { BaseEmail } from "./BaseEmail";

export const PaymentSuccessEmail = ({ 
  amount = "$29.00", 
  date = new Date().toLocaleDateString(),
  description = "Brainigen Pro Plan - Monthly",
  invoiceUrl = "https://brainigen.com/dashboard/billing"
}: { 
  amount?: string;
  date?: string;
  description?: string;
  invoiceUrl?: string;
}) => {
  return (
    <BaseEmail previewText={`Payment confirmed — ${amount}`}>
      <Heading className="heading text-[24px] font-bold tracking-tight mb-[16px] m-0">
        Payment Successful
      </Heading>
      
      <Text className="text text-[15px] leading-[24px] mb-[24px]">
        Thanks for your payment! We've successfully processed your transaction. Your account is active and ready to go.
      </Text>

      <Section className="border border-border rounded-lg p-[16px] mb-[32px] bg-muted/30">
        <Row className="mb-[8px]">
          <Column><Text className="text-muted-foreground m-0 text-[14px]">Date</Text></Column>
          <Column align="right"><Text className="font-medium m-0 text-[14px]">{date}</Text></Column>
        </Row>
        <Row className="mb-[8px]">
          <Column><Text className="text-muted-foreground m-0 text-[14px]">Description</Text></Column>
          <Column align="right"><Text className="font-medium m-0 text-[14px]">{description}</Text></Column>
        </Row>
        <Row className="pt-[8px] border-t border-border">
          <Column><Text className="font-semibold m-0 text-[14px]">Total Paid</Text></Column>
          <Column align="right"><Text className="font-bold text-brand m-0 text-[16px]">{amount}</Text></Column>
        </Row>
      </Section>

      <Section>
        <Row>
          <Column>
            <Button
              href={invoiceUrl}
              className="bg-brand text-white text-[14px] font-semibold px-[24px] py-[12px] rounded-lg text-center"
            >
              View in Dashboard
            </Button>
          </Column>
        </Row>
      </Section>
    </BaseEmail>
  );
};
