import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack } from "expo-router";
import { router } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{
          title: "Regresar",
        }}
      />
    </Stack>
  );
}
