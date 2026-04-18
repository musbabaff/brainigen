import { Button, Heading, Section, Text, Link } from "@react-email/components";
import * as React from "react";
import { BaseEmail } from "./BaseEmail";

export const EmailVerificationEmail = ({ name = "there", verifyLink = "https://brainigen.com/verify" }: { name?: string; verifyLink?: string }) => {
  return (
    <BaseEmail previewText="Verify your email address">
      <Heading className="heading text-[24px] font-bold tracking-tight mb-[16px] m-0">
        Verify your email address
      </Heading>
      
      <Text className="text text-[15px] leading-[24px] mb-[24px]">
        Hi {name},<br />
        Please verify your email address so you can access all features of your Brainigen account.
      </Text>

      <Section className="mb-[32px]">
        <Button
          href={verifyLink}
          className="bg-brand text-white text-[14px] font-semibold px-[24px] py-[12px] rounded-lg text-center"
        >
          Verify Email
        </Button>
      </Section>

      <Text className="text text-[14px] text-muted-foreground mb-[16px]">
        This link expires in 24 hours.
      </Text>

      <Text className="text text-[14px] text-muted-foreground break-all">
        Or copy and paste this URL into your browser: <br />
        <Link href={verifyLink} className="text-brand">{verifyLink}</Link>
      </Text>
    </BaseEmail>
  );
};
