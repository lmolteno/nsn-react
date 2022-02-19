import { useQuery } from "react-query";

export interface Subject {
    display_name: string
    name: string
    subject_id: number
}

interface Content {
    html: string
    level: number
}

export interface StandardSummary {
    standard_number: number
    level: number
    credits: number
    title: string
    internal: boolean
    version: number
    type_id: 0 | 1
    reading: boolean
    writing: boolean
    literacy: boolean
    numeracy: boolean
    field_id: number
    subfield_id: number
    domain_id: number
}

interface StandardBasicInfo {
    standard_number: number
    level: number
    credits: number
    title: string
    internal: boolean
    version: number
    field: string
    subfield: string
    domain: string
    type: string
}

interface NCEACreditType {
    literacy: boolean
    numeracy: boolean
}

interface UECreditType {
    reading: boolean
    writing: boolean
}

export interface Standard {
    basic_info: StandardBasicInfo
    subjects: Subject[]
    ue_literacy: UECreditType
    ncea_litnum: NCEACreditType
}

export interface Resource {
    category: string
    filepath: string
    nzqa_url: string
    standard_number: number
    title: string
    year?: number
}

const API_URL = 'https://nsn.nz/api'

export const getSubjects = async () => {
    const r = await fetch(`${API_URL}/subjects`);
    const body = await r.json();
    if (body.success) {
        return body.subjects as Subject[];
    }
    return null
}

export const getContent = async (subjectId: number) => {
    const r = await fetch(`${API_URL}/content?id=${subjectId}`);
    const body = await r.json();
    if (body.success) {
        return body.content as Content[];
    }
    return null
}

export const getStandards = async (subjectId: number) => {
    const r = await fetch(`${API_URL}/standards?subject=${subjectId}`);
    const body = await r.json();
    if (body.success) {
        return (body.standards as StandardSummary[]).sort((a, b) => {
            if (a.level > b.level) {
                return -1
            } else if (a.level < b.level) { 
                return 1
            } else if (a.standard_number > b.standard_number) {
                return -1
            }
            return 1
        });
    }
    return null
}

export const getStandard = async (standardNumber: number) => {
    const r = await fetch(`${API_URL}/standards?number=${standardNumber}`);
    const body = await r.json();
    if (body.success) {
        return body as Standard;
    }
    return null
}

export const getResources = async (standardNumber: number) => {
    const r = await fetch(`${API_URL}/resources?number=${standardNumber}`);
    const body = await r.json();
    if (body.success) {
        return body.resources as Resource[]
    }
    return null
}
