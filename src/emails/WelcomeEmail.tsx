import { Button, Heading, Section, Text, Row, Column } from "@react-email/components";
import * as React from "react";
import { BaseEmail } from "./BaseEmail";

export const WelcomeEmail = ({ name = "there" }: { name?: string }) => {
  return (
    <BaseEmail previewText={`Welcome to Brainigen, ${name} 🚀`}>
      <Heading className="heading text-[24px] font-bold tracking-tight mb-[16px] m-0">
        Welcome to Brainigen, {name}! 🚀
      </Heading>
      
      <Text className="text text-[15px] leading-[24px] text-foreground mb-[24px]">
        You've just joined the future of work. We're thrilled to have you on board. Brainigen makes it incredibly easy to build, deploy, and manage AI agents that automate your workflows.
      </Text>

      <Section className="bg-brand/5 border border-brand/20 rounded-lg p-[24px] mb-[32px]">
        <Heading className="heading text-[18px] font-semibold m-0 mb-[16px]">
          3 Quick Steps to Get Started
        </Heading>

        <Row className="mb-[16px]">
          <Column className="w-[32px] pr-[16px]">
            <div className="bg-brand/20 text-brand font-bold w-[24px] h-[24px] rounded-full text-center leading-[24px] text-[12px]">1</div>
          </Column>
          <Column>
            <Text className="text text-[14px] font-medium m-0">Create your first agent</Text>
            <Text className="text text-[13px] text-muted-foreground m-0">Define what you want your AI to do.</Text>
          </Column>
        </Row>

        <Row className="mb-[16px]">
          <Column className="w-[32px] pr-[16px]">
            <div className="bg-brand/20 text-brand font-bold w-[24px] h-[24px] rounded-full text-center leading-[24px] text-[12px]">2</div>
          </Column>
          <Column>
            <Text className="text text-[14px] font-medium m-0">Connect your tools</Text>
            <Text className="text text-[13px] text-muted-foreground m-0">Give your agent access to your favorite apps.</Text>
          </Column>
        </Row>

        <Row>
          <Column className="w-[32px] pr-[16px]">
            <div className="bg-brand/20 text-brand font-bold w-[24px] h-[24px] rounded-full text-center leading-[24px] text-[12px]">3</div>
          </Column>
          <Column>
            <Text className="text text-[14px] font-medium m-0">Deploy & monitor</Text>
            <Text className="text text-[13px] text-muted-foreground m-0">Watch it work and view analytics.</Text>
          </Column>
        </Row>
      </Section>

      <Section className="text-center">
        <Button
          href="https://brainigen.com/dashboard/agents/new"
          className="bg-brand text-white text-[14px] font-semibold px-[24px] py-[12px] rounded-lg text-center"
        >
          Create Your First Agent
        </Button>
      </Section>
    </BaseEmail>
  );
};
