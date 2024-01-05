import { IsoDate } from "../../../shared/types/iso-date";

export interface Message {
  id: string;
  created_at: IsoDate;
  user1_id: string;
  user2_id: string;
  message: string;
}
