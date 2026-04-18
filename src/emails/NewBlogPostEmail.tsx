import { Button, Heading, Section, Text, Img, Link } from "@react-email/components";
import * as React from "react";
import { BaseEmail } from "./BaseEmail";

export const NewBlogPostEmail = ({ 
  title = "10 Ways AI Saves Your Business Time", 
  excerpt = "Discover how modern AI agents can automate your most tedious workflows, saving your team hours every single week.",
  coverImage = "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600",
  postUrl = "https://brainigen.com/blog/ai-saves-time"
}: { 
  title?: string;
  excerpt?: string;
  coverImage?: string;
  postUrl?: string;
}) => {
  return (
    <BaseEmail previewText={title}>
      <Section className="mb-[24px] rounded-xl overflow-hidden">
        <Img src={coverImage} width="100%" height="auto" alt={title} style={{ objectFit: "cover" }} />
      </Section>

      <Heading className="heading text-[24px] font-bold tracking-tight mb-[16px] m-0">
        {title}
      </Heading>
      
      <Text className="text text-[15px] leading-[24px] mb-[24px] text-muted-foreground">
        {excerpt}
      </Text>

      <Section className="mb-[32px]">
        <Button
          href={postUrl}
          className="bg-brand text-white text-[14px] font-semibold px-[24px] py-[12px] rounded-lg text-center"
        >
          Read the Full Article
        </Button>
      </Section>

      <Hr className="border-border my-[24px]" />

      <Text className="text text-[12px] text-muted-foreground text-center">
        Don't want to receive our newsletter? <Link href="https://brainigen.com/unsubscribe" className="text-brand">Unsubscribe here</Link>.
      </Text>
    </BaseEmail>
  );
};

// Also mock Hr since I didn't import it in the component body
const Hr = ({ className }: { className?: string }) => <hr className={className} />;
