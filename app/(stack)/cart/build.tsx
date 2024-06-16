import {
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter, Stack } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { openai, productsService } from "@services/infrastructure";
import Product from "@services/domain/entities/product.entity";

export default function BuildCart() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [base64Photo, setBase64Photo] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  useEffect(() => {
    productsService.list().then(setProducts);
  }, []);

  const takePhoto = async () => {
    if (!cameraRef.current) {
      return;
    }

    if (!permission?.granted) {
      return;
    }

    const photo = await cameraRef.current.takePictureAsync({ base64: true });
    if (!photo || !photo.base64) {
      Alert.alert("Error", "No se pudo tomar la foto");
    }
    setBase64Photo(photo!.base64!);

    Alert.alert("Foto tomada", "La foto fue tomada correctamente");

    await askOpenAI(photo!.base64!);
  };

  const askOpenAI = async (base64: string) => {
    console.log("Asking OpenAI");

    if (!base64) {
      return;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 3000,
      messages: [
        {
          role: "system",
          content: `
            You are a shopping assistant for grocery stores.
            Help users build their shopping cart (particularly restocking products) based on what you see in the images they send you.

            Please note that the products we handle are:
            \`\`\`json
            [${JSON.stringify(products)}]
            \`\`\`

            IMPORTANT! You must ALWAYS return the information in the following JSON format:
            \`\`\`json
            {
              "items": [
                {
                  "id": <product id in string (NOTE: use the actual product ID, not the SKU)>,
                  "quantity": <product quantity in integer>
                }
              ]
            }
            \`\`\`

            ONLY answer with that JSON format, otherwise the app will not work correctly. And do NOT use makdown or any other format, just plain text.
            `,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Esto es lo que tengo actualmente en mi tienda dáme tus sugerencias en el formato JSON y en base a los productos que tienes disponibles.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64}`,
              },
            },
          ],
        },
      ],
    });

    const suggestion = completion.choices[0].message.content || "{}";
    try {
      const parsedSuggestion = JSON.parse(suggestion);
      Alert.alert("Sugerencia", "La sugerencia fue generada correctamente");
      router.push({
        pathname: "(stack)/cart/summary",
        params: { suggestions: JSON.stringify(parsedSuggestion) },
      });
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo generar la sugerencia, por favor intenta de nuevo",
      );
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Carrito inteligente" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            paddingBottom: 50,
          }}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                marginBottom: 5,
                textAlign: "left",
                color: "white",
              }}
            >
              Construyámos tu carrito
            </Text>
            <Text style={{ fontSize: 17, color: "white", opacity: 0.5 }}>
              Para construír tu carrito, toma una foto de tu inventario y
              nosotros nos encargamos de ver que falta 😉
            </Text>
          </View>
          <View>
            <View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  padding: 5,
                  borderRadius: 100,
                  borderColor: "#FFFFFF50",
                  borderWidth: 1,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#F24452",
                    padding: 16,
                    borderRadius: 100,
                    height: 56,
                    width: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 32,
                    opacity: loading ? 0.5 : 1,
                  }}
                  onPress={
                    loading
                      ? () => {}
                      : async () => {
                          setLoading(true);
                          try {
                            await takePhoto();
                          } catch (error) {
                            console.error(error);
                          } finally {
                            setLoading(false);
                          }
                        }
                  }
                >
                  {!loading ? (
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 16,
                      }}
                    >
                      Capturar
                    </Text>
                  ) : (
                    <ActivityIndicator color="white" size="small" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <CameraView
          style={{
            flex: 1,
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: -1,
          }}
          ref={cameraRef}
        />
      </SafeAreaView>
    </>
  );
}
