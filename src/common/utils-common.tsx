import { Nullable } from "primereact/ts-helpers";

export const parseError = (e: unknown): Error => {
    return e as Error;
};

export const formatDate = (date: Nullable<Date>) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  export const formatTime = (time: Nullable<Date>) => {
    if (!time) return "";
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  export const parseDate = (dateString: string): Nullable<Date> => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // Month is zero-based in JavaScript Date
  };
  
  export const parseTime = (timeString: string): Nullable<Date> => {
    if (!timeString) return null;
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const now = new Date(); // Use current date to keep the full Date object
    now.setHours(hours, minutes, seconds);
    return now;
  };

  export const getMatchBasedOnSportsType = (sportsType: string) => {
    if (sportsType === "Cricket") {
        return "cricket";
    } else if (sportsType === "Football") {
        return "football";
    } else if (sportsType === "Basket Ball") {
        return "basketball";
    } else if (sportsType === "Volley Ball") {
        return "volleyball";
    }
}