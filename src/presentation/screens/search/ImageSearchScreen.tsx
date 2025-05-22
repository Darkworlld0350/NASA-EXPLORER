import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useSearchViewModel } from '../../../presentation/viewmodels/search/useSearchViewModel';
import { Image} from 'react-native';

type FormData = {
  query: string;
};

const ImageSearchScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { onSearch, data, loading, error } = useSearchViewModel();

  const onSubmit = (form: FormData) => {
    onSearch(form.query);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      {loading && <ActivityIndicator size="large" style={styles.loading} />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      {data.length > 0 && (
        <View style={styles.results}>
          {data.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              {item.imageUrl !== "" && (
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              )}
              <Text>{item.description}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
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
  results: { marginTop: 20 },
  card: { marginBottom: 20 },
  title: { fontWeight: "bold", marginBottom: 5 },
  image: { width: "100%", height: 200, marginBottom: 10, borderRadius: 8 },
});

export default ImageSearchScreen;