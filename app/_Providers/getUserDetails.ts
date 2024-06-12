'use server'
import { createClient } from "@/utils/supabase/server";
import { createClient as createDBClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

export const getUserDetails = async () => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const user_id = user.data.user?.id
    const email = user.data.user?.email
    let { data, error } = await supabase
        .from('user_details')
        .select('*')
        .or(`email.eq.${email}`);
    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export const getUserCredits = async () => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const email = user.data.user?.email
    let { data, error } = await supabase
        .from('user_credits')
        .select('*')
        .or(`username.eq.${email}`);
    if (error) {
        throw new Error(error.message);
    }

    return data;
}


export const getWorkflows = async () => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const email = user.data.user?.email
    let { data, error } = await supabase
        .from('workflows')
        .select('*')
        .or(`email.eq.${email}`);
    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export const checkIntegration = async () => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const email = user.data.user?.email
    let { data, error } = await supabase
        .from('Eagleowl')
        .select('*')
        .or(`email.eq.${email}`);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
export const addIntegration = async (integrationEmail: string, integrationPassword: string) => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const user_id = user.data.user?.id
    const email = user.data.user?.email
    let { data, error } = await supabase
        .from('Eagleowl')
        .insert({
            id: user_id,
            username: email,
            email: integrationEmail,
            password: integrationPassword
        })
    if (error) {
        throw new Error(error.message);
    }
}


export const updateIntegration = async (integrationEmail: string, integrationPassword: string) => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const email = user.data.user?.email
    let { data, error } = await supabase
        .from('Eagleowl')
        .update({
            email: integrationEmail,
            password: integrationPassword
        })
        .eq('username', email);
}

