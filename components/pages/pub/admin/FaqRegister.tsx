'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { majorCategoryOptions, subCategoryOptions } from './Admin.data';
import { AdminFrame, AdminSelectBox } from './Admin';
import * as S from '../../../../styles/components/pages/pub/admin/Admin';

type RegisterFormState = {
  enabled: boolean;
  majorCategory: string;
  subCategory: string;
  metaTag: string;
  question: string;
  note: string;
  order: string;
};

const createInitialFormState = (): RegisterFormState => ({
  enabled: true,
  majorCategory: '선택',
  subCategory: '선택',
  metaTag: '',
  question: '',
  note: '',
  order: '',
});

const FaqRegister = () => {
  const router = useRouter();
  const [form, setForm] = useState<RegisterFormState>(createInitialFormState);
  const [savedForm, setSavedForm] = useState<RegisterFormState>(createInitialFormState);
  const [toastMessage, setToastMessage] = useState('');
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timer = window.setTimeout(() => setToastMessage(''), 3000);

    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasChanges) {
        return;
      }

      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  const updateForm = <K extends keyof RegisterFormState>(field: K, value: RegisterFormState[K]) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
    setHasChanges(true);
  };

  const hasMissingRequiredValue =
    form.majorCategory === '선택' ||
    form.subCategory === '선택' ||
    !form.question.trim() ||
    !form.order.trim();

  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      router.push('/pub/admin/faqs');
    }
  };

  const handleSave = () => {
    if (hasMissingRequiredValue) {
      setToastMessage('필수값을 입력해 주세요.');
      return;
    }

    if (!hasChanges) {
      setToastMessage('변경내역이 없습니다.');
      return;
    }

    setSavedForm({ ...form });
    setHasChanges(false);
    setShowSavedModal(true);
  };

  const handleContinueRegister = () => {
    const initialForm = createInitialFormState();

    setForm(initialForm);
    setSavedForm(initialForm);
    setShowSavedModal(false);
    setHasChanges(false);
  };

  const handleBeforeNavigate = () => {
    if (!hasChanges) {
      return true;
    }

    const shouldLeave = window.confirm('페이지를 저장하지 않고 나가시겠습니까?');

    if (shouldLeave) {
      setForm({ ...savedForm });
      setHasChanges(false);
    }

    return shouldLeave;
  };

  return (
    <AdminFrame
      title="FAQ 등록"
      onBeforeNavigate={handleBeforeNavigate}
      actions={
        <S.ButtonGroup>
          <S.Button type="button" $size="large" $variant="del" onClick={handleDelete}>
            삭제
          </S.Button>
          <S.Button type="button" $size="large" $variant="solid" onClick={handleSave}>
            저장
          </S.Button>
        </S.ButtonGroup>
      }
    >
      <S.FormSection>
        <S.FormGrid>
          <S.FormCell>
            <S.SearchLabel>FAQ 번호</S.SearchLabel>
            <S.StaticText>FN-YYYYMMDD-0001</S.StaticText>
          </S.FormCell>
          <S.FormCell>
            <S.SearchLabel>등록일자</S.SearchLabel>
            <S.StaticText>
              <S.StaticTextEmphasis>2026-06-10</S.StaticTextEmphasis>
            </S.StaticText>
          </S.FormCell>
          <S.FormCell>
            <S.SearchLabel>
              사용여부 <S.RequiredMark>*</S.RequiredMark>
            </S.SearchLabel>
            <S.CheckboxLabel>
              <S.Checkbox type="checkbox" checked={form.enabled} onChange={(event) => updateForm('enabled', event.target.checked)} />
              <span>사용</span>
            </S.CheckboxLabel>
          </S.FormCell>

          <S.FormCell>
            <S.SearchLabel>
              대분류 <S.RequiredMark>*</S.RequiredMark>
            </S.SearchLabel>
            <AdminSelectBox
              key={`major-${form.majorCategory}`}
              options={['선택', ...majorCategoryOptions.slice(1)]}
              defaultValue={form.majorCategory}
              ariaLabel="대분류"
              onChange={(option) => updateForm('majorCategory', option)}
            />
          </S.FormCell>
          <S.FormCell>
            <S.SearchLabel>
              소분류 <S.RequiredMark>*</S.RequiredMark>
            </S.SearchLabel>
            <AdminSelectBox
              key={`sub-${form.subCategory}`}
              options={['선택', ...subCategoryOptions.slice(1)]}
              defaultValue={form.subCategory}
              ariaLabel="소분류"
              onChange={(option) => updateForm('subCategory', option)}
            />
          </S.FormCell>
          <S.FormCell>
            <S.SearchLabel>메타태그</S.SearchLabel>
            <S.Input value={form.metaTag} placeholder="메타태그 입력" onChange={(event) => updateForm('metaTag', event.target.value)} />
          </S.FormCell>

          <S.FormCell $span="full">
            <S.SearchLabel>
              질문 <S.RequiredMark>*</S.RequiredMark>
            </S.SearchLabel>
            <S.Input value={form.question} placeholder="질문 입력" onChange={(event) => updateForm('question', event.target.value)} />
          </S.FormCell>

          <S.FormCell $span="wide">
            <S.SearchLabel>비고</S.SearchLabel>
            <S.Input value={form.note} placeholder="비고 입력" onChange={(event) => updateForm('note', event.target.value)} />
          </S.FormCell>
          <S.FormCell>
            <S.SearchLabel>
              순번 <S.RequiredMark>*</S.RequiredMark>
            </S.SearchLabel>
            <S.Input value={form.order} type="text" inputMode="numeric" placeholder="숫자 입력" onChange={(event) => updateForm('order', event.target.value.replace(/\D/g, ''))} />
          </S.FormCell>
        </S.FormGrid>
      </S.FormSection>

      <S.EditorSection aria-label="본문 에디터 영역" />

      {toastMessage ? <S.Toast role="status">{toastMessage}</S.Toast> : null}

      {showSavedModal ? (
        <>
          <S.Dimmed />
          <S.AlertModal role="dialog" aria-modal="true" aria-labelledby="faq-register-saved-title">
            <S.AlertTitle id="faq-register-saved-title">FAQ가 저장되었습니다</S.AlertTitle>
            <S.AlertActions>
              <S.AlertActionButton type="button" $variant="soft" onClick={() => router.push('/pub/admin/faqs')}>
                목록으로 가기
              </S.AlertActionButton>
              <S.AlertActionButton type="button" $variant="solid" onClick={handleContinueRegister}>
                계속 등록
              </S.AlertActionButton>
            </S.AlertActions>
          </S.AlertModal>
        </>
      ) : null}
    </AdminFrame>
  );
};

export default FaqRegister;
