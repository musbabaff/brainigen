import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface BaseEmailProps {
  previewText?: string;
  children: React.ReactNode;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : "https://brainigen.com";

export const BaseEmail = ({ previewText = "Update from Brainigen", children }: BaseEmailProps) => {
  return (
    <Html>
      <Head>
        <style>
          {`
            @media (prefers-color-scheme: dark) {
              .body { background-color: #030014 !important; color: #ffffff !important; }
              .container { border-color: #1a1a2e !important; background-color: #0f0b29 !important; }
              .text { color: #a1a1aa !important; }
              .heading { color: #ffffff !important; }
              .footer-text { color: #71717a !important; }
            }
          `}
        </style>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#5B4FE9",
                background: "#ffffff",
                foreground: "#09090b",
                muted: "#f4f4f5",
                "muted-foreground": "#71717a",
                border: "#e4e4e7",
              },
            },
          },
        }}
      >
        <Body className="body bg-background text-foreground font-sans m-0 p-0" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
          <Container className="container mx-auto my-[40px] max-w-[600px] border border-solid border-border rounded-xl p-[40px] bg-white">
            {/* Logo */}
            <Section className="mb-[32px]">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" stroke="#5B4FE9" strokeWidth="1.5" opacity="0.2" />
                  <circle cx="16" cy="8" r="2.5" fill="#5B4FE9" />
                  <circle cx="8" cy="20" r="2.5" fill="#5B4FE9" />
                  <circle cx="24" cy="20" r="2.5" fill="#5B4FE9" />
                  <circle cx="16" cy="16" r="3" fill="#5B4FE9" opacity="0.6" />
                  <line x1="16" y1="10.5" x2="16" y2="13" stroke="#5B4FE9" strokeWidth="1.2" opacity="0.5" />
                  <line x1="14" y1="17.5" x2="10" y2="18.5" stroke="#5B4FE9" strokeWidth="1.2" opacity="0.5" />
                  <line x1="18" y1="17.5" x2="22" y2="18.5" stroke="#5B4FE9" strokeWidth="1.2" opacity="0.5" />
                </svg>
                <Text className="heading text-xl font-bold m-0 p-0 tracking-tight" style={{ marginLeft: "12px" }}>Brainigen</Text>
              </div>
            </Section>

            {/* Main Content */}
            {children}

            <Hr className="border-border my-[32px]" />

            {/* Footer */}
            <Section>
              <Text className="footer-text text-muted-foreground text-xs leading-[24px]">
                Brainigen Inc. <br />
                123 AI Boulevard, San Francisco, CA 94107
              </Text>
              
              <div className="mt-[16px] mb-[24px]">
                <Link href={`${baseUrl}/twitter`} className="text-muted-foreground text-xs mr-[16px]">Twitter</Link>
                <Link href={`${baseUrl}/linkedin`} className="text-muted-foreground text-xs mr-[16px]">LinkedIn</Link>
                <Link href={`${baseUrl}/github`} className="text-muted-foreground text-xs">GitHub</Link>
              </div>

              <Text className="footer-text text-muted-foreground text-[10px] leading-[18px]">
                You received this email because you are registered with Brainigen.{" "}
                <Link href={`${baseUrl}/dashboard/settings/notifications`} className="text-muted-foreground underline">
                  Unsubscribe or manage preferences
                </Link>
                .
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
