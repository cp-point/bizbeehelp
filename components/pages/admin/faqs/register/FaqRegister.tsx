'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import axiosInstance from '../../../../../libs/axios';
import { Post } from '../../../../../service/crud';
import type { Request as ApiRequest } from '../../../../../types/Common';
import type { FaqDetailData, MajorList, MinorList } from '../../../../../types/Faq';
import * as S from '../../../../../styles/pages/admin/faqs/register/FaqRegister';

type FaqRegisterFormState = {
    faqId: string;
    createdAt: string;
    updatedAt: string;
    majorCode: string;
    majorName: string;
    minorCode: string;
    minorName: string;
    title: string;
    content: string;
    metaTag: string;
    sortOrder: string;
    useYn: 'Y' | 'N';
    remark: string;
};

type FaqRegisterEditableField = 'metaTag' | 'title' | 'content' | 'sortOrder' | 'useYn' | 'remark';

const fetcher = (payload: ApiRequest) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const initialFormState: FaqRegisterFormState = {
    faqId: '',
    createdAt: '',
    updatedAt: '',
    majorCode: '',
    majorName: '',
    minorCode: '',
    minorName: '',
    title: '',
    content: '',
    metaTag: '',
    sortOrder: '',
    useYn: 'Y',
    remark: '',
};

const formatDateTime = (value?: string | null) => {
    if (!value) {
        return '';
    }

    const normalizedValue = value.replace('T', ' ');

    return normalizedValue.length >= 19 ? normalizedValue.slice(0, 19) : normalizedValue;
};

const mapFaqToForm = (faq: FaqDetailData): FaqRegisterFormState => ({
    faqId: faq.faqId,
    createdAt: formatDateTime(faq.createdAt),
    updatedAt: formatDateTime(faq.updatedAt),
    majorCode: faq.majorCode ?? '',
    majorName: faq.majorName,
    minorCode: faq.minorCode ?? '',
    minorName: faq.minorName,
    title: faq.title,
    content: faq.content ?? '',
    metaTag: faq.metaTag ?? '',
    sortOrder: faq.sortOrder ? String(faq.sortOrder) : '',
    useYn: faq.useYn === 'N' ? 'N' : 'Y',
    remark: faq.remark ?? '',
});

const FaqRegister = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const faqId = searchParams.get('faqId');
    const [formValue, setFormValue] = useState<Partial<Pick<FaqRegisterFormState, FaqRegisterEditableField>>>({});
    const [changedMajorCode, setChangedMajorCode] = useState<string | null>(null);
    const [changedMinorCode, setChangedMinorCode] = useState<string | null>(null);
    const { data: faqDetail } = useSWR<FaqDetailData>(
        faqId
            ? {
                  url: '/faq/detail',
                  method: 'POST',
                  param: {
                      faqId,
                  },
              }
            : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );
    const form = useMemo(() => {
        if (faqDetail) {
            return mapFaqToForm(faqDetail);
        }

        return faqId ? { ...initialFormState, faqId } : initialFormState;
    }, [faqDetail, faqId]);

    const { data: majorData = [] } = useSWR<MajorList>(
        {
            url: '/major',
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );

    const defaultMajorCode = form.majorCode || majorData.find((major) => major.majorName === form.majorName)?.majorCode || '';
    const selectedMajorCode = changedMajorCode ?? defaultMajorCode;
    const { data: minorData = [] } = useSWR<MinorList>(
        selectedMajorCode
            ? {
                  url: '/minor',
                  method: 'GET',
                  param: {
                      majorCode: selectedMajorCode,
                  },
              }
            : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );
    const defaultMinorCode = form.minorCode || minorData.find((minor) => minor.minorName === form.minorName)?.minorCode || '';
    const selectedMinorCode = changedMinorCode ?? defaultMinorCode;
    const metaTag = formValue.metaTag ?? form.metaTag;
    const title = formValue.title ?? form.title;
    const content = formValue.content ?? form.content;
    const sortOrder = formValue.sortOrder ?? form.sortOrder;
    const useYn = formValue.useYn ?? form.useYn;
    const remark = formValue.remark ?? form.remark;

    const handleMajorChange = (majorCode: string) => {
        setChangedMajorCode(majorCode);
        setChangedMinorCode('');
    };

    const updateFormValue = <K extends FaqRegisterEditableField>(field: K, value: FaqRegisterFormState[K]) => {
        setFormValue((prevFormValue) => ({
            ...prevFormValue,
            [field]: value,
        }));
    };

    const handleDelete = () => {
        if (!form.faqId) {
            alert('삭제할 FAQ를 선택해주세요.');
            return;
        }

        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }

        Post(
            '/faq/delete',
            {
                faqId: form.faqId,
            },
            (response) => {
                if (response.type === 'SUCCESS') {
                    alert(response.message || '삭제되었습니다.');
                    router.push('/admin/faqs');
                    return;
                }

                alert(response.message || '삭제에 실패했습니다.');
            },
            false,
        );
    };

    const handleSave = () => {
        const missingRequiredFields = [
            !selectedMajorCode ? '대분류' : '',
            !selectedMinorCode ? '소분류' : '',
            useYn !== 'Y' && useYn !== 'N' ? '사용여부' : '',
            !title.trim() ? '질문' : '',
            !sortOrder.trim() ? '순번' : '',
        ].filter(Boolean);

        if (missingRequiredFields.length > 0) {
            alert(`${missingRequiredFields.join(', ')} 항목을 작성해주세요.`);
            return;
        }

        Post(
            '/faq/save',
            [
                {
                    faqId: form.faqId,
                    majorCode: selectedMajorCode,
                    minorCode: selectedMinorCode,
                    title,
                    content,
                    metaTag,
                    sortOrder: sortOrder ? Number(sortOrder) : null,
                    useYn,
                    remark,
                },
            ],
            (response) => {
                if (response.type === 'SUCCESS') {
                    alert(response.message || '저장되었습니다.');
                    router.push('/admin/faqs');
                    return;
                }

                alert(response.message || '저장에 실패했습니다.');
            },
            false,
        );
    };

    return (
        <S.FaqRegisterPage>
            <S.FaqRegisterHeader>
                <S.FaqRegisterTitle>{faqId ? 'FAQ 수정' : 'FAQ 등록'}</S.FaqRegisterTitle>
                <S.FaqRegisterButtonGroup>
                    <S.FaqRegisterButton type="button" $size="large" $variant="del" onClick={handleDelete}>
                        삭제
                    </S.FaqRegisterButton>
                    <S.FaqRegisterButton type="button" $size="large" $variant="solid" onClick={handleSave}>
                        저장
                    </S.FaqRegisterButton>
                </S.FaqRegisterButtonGroup>
            </S.FaqRegisterHeader>

            <S.FaqRegisterFormSection>
                <S.FaqRegisterFormGrid>
                    <S.FaqRegisterFormCell>
                        <S.FaqRegisterLabel>FAQ 번호</S.FaqRegisterLabel>
                        <S.FaqRegisterStaticText>{form.faqId || '-'}</S.FaqRegisterStaticText>
                    </S.FaqRegisterFormCell>
                    <S.FaqRegisterFormCell>
                        <S.FaqRegisterLabel>등록일자</S.FaqRegisterLabel>
                        <S.FaqRegisterStaticText>
                            <S.FaqRegisterStaticTextEmphasis>{form.createdAt || '-'}</S.FaqRegisterStaticTextEmphasis>
                        </S.FaqRegisterStaticText>
                    </S.FaqRegisterFormCell>
                    <S.FaqRegisterFormCell>
                        <S.FaqRegisterLabel>
                            사용여부 <S.FaqRegisterRequiredMark>*</S.FaqRegisterRequiredMark>
                        </S.FaqRegisterLabel>
                        <S.FaqRegisterCheckboxLabel>
                            <S.FaqRegisterCheckbox
                                type="checkbox"
                                checked={useYn === 'Y'}
                                onChange={(event) => updateFormValue('useYn', event.target.checked ? 'Y' : 'N')}
                            />
                            <span>사용</span>
                        </S.FaqRegisterCheckboxLabel>
                    </S.FaqRegisterFormCell>

                    <S.FaqRegisterFormCell>
                        <S.FaqRegisterLabel>
                            대분류 <S.FaqRegisterRequiredMark>*</S.FaqRegisterRequiredMark>
                        </S.FaqRegisterLabel>
                        <S.FaqRegisterSelectBox>
                            <S.FaqRegisterSelect value={selectedMajorCode} onChange={(event) => handleMajorChange(event.target.value)}>
                                <option value="">선택</option>
                                {majorData.map((major) => (
                                    <option key={major.majorCode} value={major.majorCode}>
                                        {major.majorName}
                                    </option>
                                ))}
                            </S.FaqRegisterSelect>
                        </S.FaqRegisterSelectBox>
                    </S.FaqRegisterFormCell>
                    <S.FaqRegisterFormCell>
                        <S.FaqRegisterLabel>
                            소분류 <S.FaqRegisterRequiredMark>*</S.FaqRegisterRequiredMark>
                        </S.FaqRegisterLabel>
                        <S.FaqRegisterSelectBox>
                            <S.FaqRegisterSelect
                                value={selectedMinorCode}
                                disabled={!selectedMajorCode}
                                onChange={(event) => setChangedMinorCode(event.target.value)}
                            >
                                <option value="">선택</option>
                                {minorData.map((minor) => (
                                    <option key={minor.minorCode} value={minor.minorCode}>
                                        {minor.minorName}
                                    </option>
                                ))}
                            </S.FaqRegisterSelect>
                        </S.FaqRegisterSelectBox>
                    </S.FaqRegisterFormCell>
                    <S.FaqRegisterFormCell>
                        <S.FaqRegisterLabel>메타태그</S.FaqRegisterLabel>
                        <S.FaqRegisterInput value={metaTag} placeholder="메타태그 입력" onChange={(event) => updateFormValue('metaTag', event.target.value)} />
                    </S.FaqRegisterFormCell>

                    <S.FaqRegisterFormCell $span="full">
                        <S.FaqRegisterLabel>
                            질문 <S.FaqRegisterRequiredMark>*</S.FaqRegisterRequiredMark>
                        </S.FaqRegisterLabel>
                        <S.FaqRegisterInput value={title} placeholder="질문 입력" onChange={(event) => updateFormValue('title', event.target.value)} />
                    </S.FaqRegisterFormCell>

                    <S.FaqRegisterFormCell $span="wide">
                        <S.FaqRegisterLabel>비고</S.FaqRegisterLabel>
                        <S.FaqRegisterInput value={remark} placeholder="비고 입력" onChange={(event) => updateFormValue('remark', event.target.value)} />
                    </S.FaqRegisterFormCell>
                    <S.FaqRegisterFormCell>
                        <S.FaqRegisterLabel>
                            순번 <S.FaqRegisterRequiredMark>*</S.FaqRegisterRequiredMark>
                        </S.FaqRegisterLabel>
                        <S.FaqRegisterInput
                            value={sortOrder}
                            inputMode="numeric"
                            placeholder="숫자 입력"
                            onChange={(event) => updateFormValue('sortOrder', event.target.value.replace(/\D/g, ''))}
                        />
                    </S.FaqRegisterFormCell>
                </S.FaqRegisterFormGrid>
            </S.FaqRegisterFormSection>

            <S.FaqRegisterEditorSection aria-label="본문 에디터 영역">
                <S.FaqRegisterEditorTextarea
                    value={content}
                    placeholder="본문 내용을 입력하세요."
                    onChange={(event) => updateFormValue('content', event.target.value)}
                />
            </S.FaqRegisterEditorSection>
        </S.FaqRegisterPage>
    );
};

export default FaqRegister;
