import { Button, Heading, Section, Text, Link } from "@react-email/components";
import * as React from "react";
import { BaseEmail } from "./BaseEmail";

export const PasswordResetEmail = ({ resetLink = "https://brainigen.com/reset" }: { resetLink?: string }) => {
  return (
    <BaseEmail previewText="Reset your password">
      <Heading className="heading text-[24px] font-bold tracking-tight mb-[16px] m-0">
        Reset your password
      </Heading>
      
      <Text className="text text-[15px] leading-[24px] mb-[24px]">
        You recently requested to reset your password for your Brainigen account. Click the button below to reset it.
      </Text>

      <Section className="mb-[32px]">
        <Button
          href={resetLink}
          className="bg-brand text-white text-[14px] font-semibold px-[24px] py-[12px] rounded-lg text-center"
        >
          Reset Password
        </Button>
      </Section>

      <Text className="text text-[14px] text-muted-foreground mb-[24px]">
        This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
      </Text>
    </BaseEmail>
  );
};
