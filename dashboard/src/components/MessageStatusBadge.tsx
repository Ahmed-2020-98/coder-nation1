import { Badge } from "@/components/ui";
import type { MessageStatus } from "@/lib/types";

export const statusLabels: Record<MessageStatus, string> = {
  new: "جديدة",
  read: "مقروءة",
  replied: "تم الرد",
  archived: "مؤرشفة",
};

const tones = { new: "info", read: "neutral", replied: "success", archived: "warning" } as const;

export function MessageStatusBadge({ status }: { status: MessageStatus }) {
  return <Badge tone={tones[status]}>{statusLabels[status]}</Badge>;
}
