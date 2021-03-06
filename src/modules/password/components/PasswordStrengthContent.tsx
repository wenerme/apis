import { consumeClientService, PasswordStrengthService } from 'src/modules/client';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { PasswordStrength } from 'src/modules/password/components/PasswordStrength';
import { notification } from 'antd';

export const PasswordStrengthContent: React.FC<{ password?; initialData? }> = ({
  password: initialPassword,
  initialData,
}) => {
  const svg = consumeClientService(PasswordStrengthService);
  const [password, setPassword] = useState(initialPassword || initialData?.password || '123456');
  const { isLoading, data } = useQuery(['zxcvbn', password], (ctx) => svg.zxcvbn(password), {
    enabled: true,
    initialData: initialData,
    staleTime: 120,
    keepPreviousData: true,
    onError(error) {
      notification.error({ message: `Failed to request zxcvbn: ${String(error)}` });
    },
  });

  return <PasswordStrength loading={isLoading} value={password} onChange={setPassword} data={data} />;
};
