import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="TKBAPP"
        options={{
          headerTitle: "User Page",
          title: "User",
        }}
      />
      <Tabs.Screen
        name="HocPhi"
        options={{
          headerTitle: "User Page",
          title: "User",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;