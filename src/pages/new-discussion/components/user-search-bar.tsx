import { Input, InputField, InputSlot, InputIcon } from "@gluestack-ui/themed";
import { SearchIcon } from "lucide-react-native";
import { useEffect, useState } from "react";

interface UserSearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export const UserSearchBar = ({ onSearch }: UserSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  return (
    <Input variant="outline" size="md">
      <InputField
        placeholder="Search"
        onChangeText={(text) => setSearchTerm(text)}
      />
      <InputSlot paddingRight="$1.5">
        <InputIcon as={SearchIcon} />
      </InputSlot>
    </Input>
  );
};
