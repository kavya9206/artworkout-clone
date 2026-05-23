import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

import { lessons } from "../../data/lessons";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ArtWorkout
      </Text>

      <Text style={styles.subtitle}>
        Practice drawing step-by-step
      </Text>

      <FlatList
        data={lessons}
        keyExtractor={(item) =>
          item.id.toString()
        }
        contentContainerStyle={{
          paddingTop: 20,
        }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/lesson",
                params: {
                  lessonId: item.id,
                },
              })
            }
          >
            <Text style={styles.cardTitle}>
              {item.title}
            </Text>

            <Text style={styles.cardText}>
              {item.steps.length} steps
            </Text>

            <Text style={styles.level}>
              {item.level}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  title: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#aaa",
    marginTop: 8,
    fontSize: 16,
  },

  card: {
    backgroundColor: "#1c1c1e",
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },

  cardTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  cardText: {
    color: "#aaa",
    marginTop: 6,
  },

  level: {
    color: "#7c3aed",
    marginTop: 10,
    fontWeight: "600",
  },
});