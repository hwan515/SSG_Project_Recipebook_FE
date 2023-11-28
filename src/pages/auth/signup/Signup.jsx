import React, { useState } from 'react';
import { styled } from 'styled-components';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import { LayoutWrapper } from '../../../layout/Layout';
import { Title } from '../login/Login';
import SignupAPI from '../../../api/auth/SignupAPI';
import { useNavigate } from 'react-router-dom';

// 회원가입 페이지 컴포넌트
function Signup() {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordCheck, setUserPasswordCheck] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  // 이메일과 비밀번호 유효성 여부를 상태로 관리
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  // 회원가입 양식 제출 처리
  const onHandleSubmit = async (e) => {
    e.preventDefault();

    // 이메일과 비밀번호의 유효성 검사
    handleEmailValid();
    handlePasswordValid();

    // 유효성 검사를 통과한 경우 회원가입 진행
    if (passwordValid && emailValid) {
      const updateUserInfo = {
        username: userId,
        password: userPassword,
        email: userEmail,
      };

      try {
        // 회원가입 API 호출
        const res = await SignupAPI(updateUserInfo);

        if (res.message === '회원가입 성공') {
          alert('환영합니다!');
          navigate('/Login');
        } else {
          // 회원가입 실패 시 에러 메시지 처리
          alert(`회원가입 실패: ${res.message}`);
        }
      } catch (error) {
        console.error('회원가입 API 호출 오류', error);
      }
    }
  };

  // 이메일 유효성 검사
  const handleEmailValid = () => {
    const testEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        userEmail
      );
    setEmailValid(testEmail);
  };

  // 비밀번호 확인 처리
  const handlePasswordValid = () => {
    setPasswordValid(userPassword === userPasswordCheck);
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <Wrapper>
        <Title>회원가입</Title>
        <Input
          label='아이디'
          type='text'
          id='userId'
          name='userId'
          placeholder=''
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Input
          label='비밀번호'
          type='password'
          id='userPw'
          name='userPw'
          placeholder=''
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <Input
          label='비밀번호 확인'
          type='password'
          id='userPwCheck'
          name='userPwCheck'
          placeholder=''
          value={userPasswordCheck}
          onChange={(e) => setUserPasswordCheck(e.target.value)}
          isvalid={passwordValid}
          errmsg='* 비밀번호가 일치하지 않습니다.'
        />
        <Input
          label='이메일'
          type='email'
          id='userEmail'
          name='userEmail'
          placeholder=''
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          isvalid={emailValid}
          errmsg='* 올바른 이메일 형식이 아닙니다.'
        />
        <Button
          type='submit'
          content='아이디 생성'
          style={{ marginTop: '50px' }}
        />
      </Wrapper>
    </form>
  );
}

const Wrapper = styled(LayoutWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Signup;
