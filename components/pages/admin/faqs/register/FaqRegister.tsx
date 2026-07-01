'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import axiosInstance from '../../../../../libs/axios';
import { Post } from '../../../../../service/crud';
import TiptapEditor from '../../../../molecules/TiptapEditor';
import { sanitizeEditorHtml } from '../../../../../utils/html';
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

type PendingImage = {
    temporarySrc: string;
    originFileName: string;
    fileData: string;
    fileSize: number;
    mimeType: string;
};

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

const createFaqFileSavePayload = (faqId: string, image: Omit<PendingImage, 'temporarySrc'>) => {
    return {
        faqId,
        files: [
            {
                originFileName: image.originFileName,
                fileData: image.fileData,
                fileSize: image.fileSize,
                mimeType: image.mimeType,
            },
        ],
    };
};

const createFaqFileUrl = (fileId: string | number) => `/api/faq/file/${encodeURIComponent(String(fileId))}`;

const getResultValue = (result: Record<string, unknown>, keys: string[]) => {
    return keys.map((key) => result[key]).find((value) => value !== undefined && value !== null);
};

const getUploadedImageUrl = (result: unknown): string => {
    if (Array.isArray(result)) {
        return getUploadedImageUrl(result[0]);
    }

    if (typeof result === 'string' && result.trim()) {
        const value = result.trim();

        if (/^(https?:|\/)/i.test(value)) {
            return value;
        }

        if (!value.startsWith('data:')) {
            return createFaqFileUrl(value);
        }

        return '';
    }

    if (!result || typeof result !== 'object') {
        return '';
    }

    const imageResult = result as Record<string, unknown>;
    const uploadedUrl = getResultValue(imageResult, ['url', 'fileUrl', 'src', 'filePath']);
    const uploadedFileId = getResultValue(imageResult, ['fileId', 'faqFileId', 'faqFileKey', 'fileKey', 'id', 'key']);

    if (typeof uploadedUrl === 'string' && uploadedUrl.trim()) {
        return uploadedUrl;
    }

    if (typeof uploadedFileId === 'string' || typeof uploadedFileId === 'number') {
        return createFaqFileUrl(uploadedFileId);
    }

    return '';
};

const getSavedFaqId = (result: unknown, fallbackFaqId: string) => {
    if (fallbackFaqId) {
        return fallbackFaqId;
    }

    if (typeof result === 'string') {
        return result;
    }

    if (Array.isArray(result)) {
        return getSavedFaqId(result[0], fallbackFaqId);
    }

    if (!result || typeof result !== 'object') {
        return '';
    }

    const saveResult = result as Record<string, unknown>;
    const faqId = saveResult.faqId || saveResult.id;

    return typeof faqId === 'string' ? faqId : '';
};

const postAsync = (url: string, payload: object) => {
    return new Promise<unknown>((resolve, reject) => {
        Post(
            url,
            payload,
            (response) => {
                if (response.type === 'SUCCESS') {
                    resolve(response.result);
                    return;
                }

                reject(new Error(response.message || '요청에 실패했습니다.'));
            },
            false,
        );
    });
};

const replaceImageSources = (html: string, imageSourceMap: Map<string, string>) => {
    if (imageSourceMap.size === 0) {
        return sanitizeEditorHtml(html);
    }

    if (typeof DOMParser === 'undefined') {
        return sanitizeEditorHtml(
            html.replace(/(<img\b[^>]*\bsrc=["'])([^"']+)(["'][^>]*>)/gi, (match, prefix, src, suffix) => {
                if (!imageSourceMap.has(src)) {
                    return match;
                }

                const nextSrc = imageSourceMap.get(src);

                return nextSrc ? `${prefix}${nextSrc}${suffix}` : match.replace(/\s+src=["'][^"']*["']/i, '');
            }),
        );
    }

    const parser = new DOMParser();
    const document = parser.parseFromString(html, 'text/html');

    document.body.querySelectorAll('img[src]').forEach((image) => {
        const currentSrc = image.getAttribute('src');

        if (!currentSrc || !imageSourceMap.has(currentSrc)) {
            return;
        }

        const nextSrc = imageSourceMap.get(currentSrc);

        if (nextSrc) {
            image.setAttribute('src', nextSrc);
            return;
        }

        image.removeAttribute('src');
    });

    return sanitizeEditorHtml(document.body.innerHTML);
};

const createFaqSavePayload = (
    form: FaqRegisterFormState,
    selectedMajorCode: string,
    selectedMinorCode: string,
    title: string,
    content: string,
    metaTag: string,
    sortOrder: string,
    useYn: 'Y' | 'N',
    remark: string,
) => [
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
];

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
    const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
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

    const handleImageUpload = (file: File, fileData: string) => {
        return new Promise<string>((resolve, reject) => {
            if (!form.faqId) {
                setPendingImages((prevPendingImages) => [
                    ...prevPendingImages,
                    {
                        temporarySrc: fileData,
                        originFileName: file.name,
                        fileData,
                        fileSize: file.size,
                        mimeType: file.type,
                    },
                ]);
                resolve(fileData);
                return;
            }

            Post(
                '/faq/file/save',
                createFaqFileSavePayload(form.faqId, {
                    originFileName: file.name,
                    fileData,
                    fileSize: file.size,
                    mimeType: file.type,
                }),
                (response) => {
                    if (response.type === 'SUCCESS') {
                        const uploadedImageUrl = getUploadedImageUrl(response.result);

                        if (!uploadedImageUrl) {
                            reject(new Error('이미지 조회 URL을 확인할 수 없습니다.'));
                            return;
                        }

                        resolve(uploadedImageUrl);
                        return;
                    }

                    reject(new Error(response.message || '이미지 저장에 실패했습니다.'));
                },
                false,
            );
        });
    };

    const savePendingImages = async (savedFaqId: string) => {
        if (!savedFaqId || pendingImages.length === 0) {
            return new Map<string, string>();
        }

        const uploadedImages = await Promise.all(
            pendingImages.map((image) =>
                postAsync('/faq/file/save', createFaqFileSavePayload(savedFaqId, {
                    originFileName: image.originFileName,
                    fileData: image.fileData,
                    fileSize: image.fileSize,
                    mimeType: image.mimeType,
                })).then((result) => {
                    const imageUrl = getUploadedImageUrl(result);

                    if (!imageUrl) {
                        throw new Error('이미지 조회 URL을 확인할 수 없습니다.');
                    }

                    return [image.temporarySrc, imageUrl] as const;
                }),
            ),
        );

        setPendingImages([]);

        return new Map(uploadedImages);
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

        const sanitizedContent = sanitizeEditorHtml(content);
        const pendingImageSourceMap = new Map(pendingImages.map((image) => [image.temporarySrc, '']));
        const initialContent = replaceImageSources(sanitizedContent, pendingImageSourceMap);

        Post(
            '/faq/save',
            createFaqSavePayload(form, selectedMajorCode, selectedMinorCode, title, initialContent, metaTag, sortOrder, useYn, remark),
            async (response) => {
                if (response.type === 'SUCCESS') {
                    const savedFaqId = getSavedFaqId(response.result, form.faqId);

                    try {
                        const uploadedImageSourceMap = await savePendingImages(savedFaqId);

                        if (uploadedImageSourceMap.size > 0) {
                            const finalContent = replaceImageSources(sanitizedContent, uploadedImageSourceMap);

                            await postAsync(
                                '/faq/save',
                                createFaqSavePayload(
                                    { ...form, faqId: savedFaqId },
                                    selectedMajorCode,
                                    selectedMinorCode,
                                    title,
                                    finalContent,
                                    metaTag,
                                    sortOrder,
                                    useYn,
                                    remark,
                                ),
                            );
                        }
                    } catch (error) {
                        console.error(error);
                        alert('FAQ는 저장되었지만 이미지 저장에 실패했습니다.');
                        return;
                    }

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
                            <S.FaqRegisterSelect value={selectedMajorCode}
                                                 onChange={(event) => handleMajorChange(event.target.value)}>
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
                        <S.FaqRegisterInput value={metaTag} placeholder="메타태그 입력"
                                            onChange={(event) => updateFormValue('metaTag', event.target.value)} />
                    </S.FaqRegisterFormCell>

                    <S.FaqRegisterFormCell $span="full">
                        <S.FaqRegisterLabel>
                            질문 <S.FaqRegisterRequiredMark>*</S.FaqRegisterRequiredMark>
                        </S.FaqRegisterLabel>
                        <S.FaqRegisterInput value={title} placeholder="질문 입력"
                                            onChange={(event) => updateFormValue('title', event.target.value)} />
                    </S.FaqRegisterFormCell>

                    <S.FaqRegisterFormCell $span="wide">
                        <S.FaqRegisterLabel>비고</S.FaqRegisterLabel>
                        <S.FaqRegisterInput value={remark} placeholder="비고 입력"
                                            onChange={(event) => updateFormValue('remark', event.target.value)} />
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
                <TiptapEditor
                    value={content}
                    placeholder="본문 내용을 입력하세요."
                    onChange={(nextContent) => updateFormValue('content', nextContent)}
                    onImageUpload={handleImageUpload}
                />
            </S.FaqRegisterEditorSection>
        </S.FaqRegisterPage>
    );
};

export default FaqRegister;
