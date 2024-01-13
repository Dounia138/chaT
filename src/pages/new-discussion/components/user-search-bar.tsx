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
        placeholder="Enter your friend's email"
        onChangeText={(text) => setSearchTerm(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <InputSlot paddingRight="$3">
        <InputIcon as={SearchIcon} />
      </InputSlot>
    </Input>
  );
};
