import { Text, View, TextInput } from 'react-native';

export default function CreateEventPage() {
  return (
    <View className="flex-1 bg-white p-5 gap-3">
      <TextInput
        secureTextEntry={true}
        placeholder="Title"
        autoCapitalize={'none'}
        className="rounded-md border border-gray-200 p-3"
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Description"
        autoCapitalize={'none'}
        multiline
        numberOfLines={3}
        className="rounded-md border border-gray-200 p-3 min-h-32"
      />
    </View>
  );
}
