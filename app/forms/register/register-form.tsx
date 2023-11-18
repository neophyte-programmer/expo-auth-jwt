import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import {
    Controller,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import {
    Alert,
    Button,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from "../../components/hierarchy/custom-text-input"
import {  registerFormSchema, RegisterFormSchema } from './schema';
import { getReadableValidationErrorMessage } from '../../utils/functions';
import { useAuth } from '../../context/auth-context';

const RegisterForm: React.FC = () => {

    const { onLogin, onRegister } = useAuth()

    const methods = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema),
        mode: 'onBlur',
    });

    const login = async (email: string, password: string) => {
        const result = await onLogin!(email, password)
        if (result && result.error) {
            Alert.alert("Something went wrong", result.msg)
        } 
    }
    const onSubmit: SubmitHandler<RegisterFormSchema> = async ({ email, password }) => {
        // console.log(JSON.stringify(data));
        const result = await onRegister!(email, password)
        if (result && result.error) {
            Alert.alert("Something went wrong", result.msg)
        } else {
            login(email, password)
        }
    };

    const onError: SubmitErrorHandler<RegisterFormSchema> = (
        errors,
        e
    ) => {
        e?.preventDefault()
        console.log(JSON.stringify(errors));
        // Alert.alert('Warning', getReadableValidationErrorMessage(errors));
    };

    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
            <ScrollView>
                <View style={styles.root}>
                    <FormProvider {...methods}>
                        <Controller
                            control={methods.control}
                            name="email"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => {
                                return (
                                    <TextInput
                                        label="Email"
                                        onBlur={onBlur}
                                        value={value}
                                        onChangeText={onChange}
                                        errorMessage={error?.message}
                                    />
                                );
                            }}
                        />
                        <View style={styles.spacing} />
                        <Controller
                            control={methods.control}
                            name="password"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => {
                                return (
                                    <TextInput
                                        secureTextEntry
                                        label="Password"
                                        onBlur={onBlur}
                                        value={value}
                                        onChangeText={onChange}
                                        errorMessage={error?.message}
                                    />
                                );
                            }}
                        />
                        <View style={styles.spacing} />


                        <View style={styles.spacing} />

                        <Button
                            disabled={methods.formState.isLoading || methods.formState.isSubmitting}
                            onPress={methods.handleSubmit(onSubmit, onError)}
                            title="Submit"
                            color={'#007BFF'}
                        />
                    </FormProvider>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    label: {
        color: '#000',
        marginBottom: 6,
        fontSize: 14,
    },
    safeArea: {
        // flex: 1,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 36,
        textAlign: 'center',
    },
    errorMessageText: {
        color: '#B00020',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 4,
    },
    spacing: {
        marginBottom: 24,
    },
});

export default RegisterForm