import { Button, Heading, Section, Text, Link } from "@react-email/components";
import * as React from "react";
import { BaseEmail } from "./BaseEmail";

export const AgentCreatedEmail = ({ 
  name = "Customer Support Bot", 
  agentUrl = "https://brainigen.com/dashboard/agents/123"
}: { 
  name?: string;
  agentUrl?: string;
}) => {
  return (
    <BaseEmail previewText={`Your agent '${name}' is ready!`}>
      <Heading className="heading text-[24px] font-bold tracking-tight mb-[16px] m-0">
        Your new agent is ready! 🎉
      </Heading>
      
      <Text className="text text-[15px] leading-[24px] mb-[24px]">
        Congratulations on creating <strong>"{name}"</strong>. It's now active and ready to start helping you automate your tasks.
      </Text>

      <Section className="bg-brand/5 border border-brand/20 rounded-lg p-[24px] mb-[32px]">
        <Heading className="heading text-[16px] font-semibold m-0 mb-[12px]">
          Quick tips for success:
        </Heading>
        <ul className="m-0 pl-[20px] text-[14px] leading-[24px] text-muted-foreground">
          <li className="mb-[8px]">Provide clear, specific system instructions.</li>
          <li className="mb-[8px]">Test your agent in the playground before deploying.</li>
          <li>Monitor analytics to see where it can be improved.</li>
        </ul>
      </Section>

      <Section className="mb-[24px]">
        <Button
          href={agentUrl}
          className="bg-brand text-white text-[14px] font-semibold px-[24px] py-[12px] rounded-lg text-center"
        >
          Test Your Agent
        </Button>
      </Section>

      <Text className="text text-[14px] text-muted-foreground">
        Need help? Check out our <Link href="https://brainigen.com/docs/best-practices" className="text-brand">Best Practices Guide</Link>.
      </Text>
    </BaseEmail>
  );
};
