import { Card, CardContent } from "@/components/ui/card";

type SectionCardProps = {
  title?: React.ReactElement;
  content: React.ReactElement;
};

const SectionCard = ({ title, content }: SectionCardProps) => {
  return (
    <Card>
      <CardContent className="w-full space-y-2">
        {title}
        {content}
      </CardContent>
    </Card>
  );
};

export default SectionCard;