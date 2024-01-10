import { IsoDate } from "../../../shared/types/iso-date";

export interface Message {
  id: string;
  created_at: IsoDate;
  from_user_id: string;
  to_user_id: string;
  message: string;
}
