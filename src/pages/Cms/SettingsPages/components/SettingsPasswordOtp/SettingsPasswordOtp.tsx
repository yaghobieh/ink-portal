import { useState, type FC } from 'react';
import { Alert, Button, Flex, Input, Select, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { NUMBER_EIGHT } from '@const/numbers.const';
import {
  confirmPasswordChangeRequest,
  requestPasswordOtpRequest,
} from '@sdk/modules/auth';
import {
  SETTINGS_OTP_CHANNEL_EMAIL,
  SETTINGS_OTP_CHANNEL_PHONE,
  SETTINGS_OTP_EMPTY,
  SETTINGS_OTP_IDS,
  SETTINGS_OTP_PASSWORD_TYPE,
} from './SettingsPasswordOtp.const';
import type { SettingsOtpChannel, SettingsPasswordOtpProps } from './SettingsPasswordOtp.types';

export const SettingsPasswordOtp: FC<SettingsPasswordOtpProps> = (props) => {
  const { token, email } = props;
  const { t } = useI18n();
  const [channel, setChannel] = useState<SettingsOtpChannel>(SETTINGS_OTP_CHANNEL_EMAIL);
  const [phone, setPhone] = useState(SETTINGS_OTP_EMPTY);
  const [otp, setOtp] = useState(SETTINGS_OTP_EMPTY);
  const [password, setPassword] = useState(SETTINGS_OTP_EMPTY);
  const [busy, setBusy] = useState(false);
  const [sentTo, setSentTo] = useState(SETTINGS_OTP_EMPTY);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(SETTINGS_OTP_EMPTY);

  const onSend = async () => {
    setError(SETTINGS_OTP_EMPTY);
    setDone(false);
    setBusy(true);
    const result = await requestPasswordOtpRequest(token, {
      channel,
      phone: channel === SETTINGS_OTP_CHANNEL_PHONE ? phone : undefined,
    });
    setBusy(false);
    if (!result) {
      setError(t.settings.otpError);
      return;
    }
    setSentTo(result.destination);
  };

  const onConfirm = async () => {
    setError(SETTINGS_OTP_EMPTY);
    setBusy(true);
    const ok = await confirmPasswordChangeRequest(token, { otp, password });
    setBusy(false);
    if (!ok) {
      setError(t.settings.otpError);
      return;
    }
    setDone(true);
    setOtp(SETTINGS_OTP_EMPTY);
    setPassword(SETTINGS_OTP_EMPTY);
  };

  if (!token) return null;

  return (
    <Flex direction="column" gap={2} className="mt-3">
      <Typography variant="h5" className="mb-0">
        {t.settings.changePassword}
      </Typography>
      <Select
        label={t.settings.otpChannel}
        value={channel}
        onChange={(value) => setChannel(value as SettingsOtpChannel)}
        options={[
          { value: SETTINGS_OTP_CHANNEL_EMAIL, label: `${t.settings.otpEmail} (${email})` },
          { value: SETTINGS_OTP_CHANNEL_PHONE, label: t.settings.otpPhone },
        ]}
        fullWidth
      />
      {channel === SETTINGS_OTP_CHANNEL_PHONE ? (
        <Input
          id={SETTINGS_OTP_IDS.PHONE}
          label={t.settings.otpPhone}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      ) : null}
      <Button
        size="sm"
        variant="outline"
        disabled={busy || (channel === SETTINGS_OTP_CHANNEL_PHONE && !phone.trim())}
        onClick={() => void onSend()}
      >
        {t.settings.otpSend}
      </Button>
      {sentTo ? (
        <Typography variant="caption" className="ink-cms__muted mb-0">
          {t.settings.otpSent} {sentTo}
        </Typography>
      ) : null}
      <Input
        id={SETTINGS_OTP_IDS.CODE}
        label={t.settings.otpCode}
        value={otp}
        onChange={(event) => setOtp(event.target.value)}
      />
      <Input
        id={SETTINGS_OTP_IDS.PASSWORD}
        type={SETTINGS_OTP_PASSWORD_TYPE}
        label={t.settings.otpNewPassword}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        size="sm"
        variant="ink"
        disabled={busy || !otp.trim() || password.length < NUMBER_EIGHT}
        onClick={() => void onConfirm()}
      >
        {t.settings.otpSubmit}
      </Button>
      {done ? (
        <Alert severity="success" variant="outlined">
          {t.settings.otpDone}
        </Alert>
      ) : null}
      {error ? (
        <Alert severity="error" variant="outlined">
          {error}
        </Alert>
      ) : null}
    </Flex>
  );
};
