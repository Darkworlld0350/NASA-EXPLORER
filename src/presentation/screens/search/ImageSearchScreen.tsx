import React, { useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useSearchViewModel } from '../../../presentation/viewmodels/search/useSearchViewModel';
import Animated, { Extrapolate, FadeInUp, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, } from 'react-native-reanimated';

const AnimatedFlatList = Animated.FlatList<any>;

type FormData = {
  query: string;
};

const ImageSearchScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { onSearch, data, loading, error, loadMore, loadingMore } = useSearchViewModel();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const formStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, 80], [120, 0], Extrapolate.CLAMP);
    const opacity = interpolate(scrollY.value, [0, 80], [1, 0], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [0, 80], [0, -20], Extrapolate.CLAMP);

    return {
      opacity,
      height,
      transform: [{ translateY }],
      overflow: "hidden",
      paddingVertical: height < 30 ? 0 : 10,
    };
  });

  const onSubmit = (form: FormData) => {
    onSearch(form.query);
  };

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Animated.View
        entering={FadeInUp.duration(500).delay(index * 100)}
        style={styles.card}
      >
        <Text style={styles.title}>{item.title}</Text>
        {item.imageUrl !== "" && (
          <Animated.Image
            entering={FadeInUp.duration(600)}
            source={{ uri: item.imageUrl }}
            style={styles.image}
          />
        )}
        <Text>{item.description}</Text>
      </Animated.View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      {/* Formulario animado que se oculta al hacer scroll */}
      <Animated.View style={[styles.form, formStyle]}>
        <Text style={styles.label}>¿Qué deseas buscar?</Text>

        <Controller
          control={control}
          name="query"
          rules={{ required: "Este campo es obligatorio" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.query && styles.inputError]}
              placeholder="Ej: Moon, Mars, Earth..."
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.query && (
          <Text style={styles.errorText}>{errors.query.message}</Text>
        )}

        <Button title="Buscar" onPress={handleSubmit(onSubmit)} />
      </Animated.View>

      {loading && <ActivityIndicator size="large" style={styles.loading} />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      {data.length > 0 && (
        <AnimatedFlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={styles.results}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  form: {
    marginBottom: 16,
    justifyContent: "center",
  },
  label: { fontSize: 18, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", marginBottom: 10 },
  loading: { marginVertical: 20 },
  results: { paddingBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontWeight: "bold", marginBottom: 5 },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
});

export default ImageSearchScreen;