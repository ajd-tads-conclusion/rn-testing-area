import { Session } from '@supabase/supabase-js';
import { saveSessionLocally, checkSessionLocally, deleteLocalSession } from '../asyncStorage'



describe('Async Storage', () => {
  const session: Session = {
    provider_token: 'email',
    access_token: 'sdfbsjdfsdsc',
    expires_in: 20000,
    expires_at: 20000,
    refresh_token: 'string',
    token_type: 'string',
    user: {
      user_metadata: {},
      app_metadata: {},
      id: 'string',
      aud: 'string',
      created_at: 'string',
    },
  }

  it('should save session', async () => {
    await saveSessionLocally(session)
    const sessao = await checkSessionLocally()

    expect(sessao).toEqual(session)
  })
  it('checks session is retrieved', async () => {
    const res = await checkSessionLocally()

    expect(res).toStrictEqual(session);
  })

  it('checks session is removed', async () => {
    await deleteLocalSession()
    const res = await checkSessionLocally()

    expect(res).toStrictEqual(null);
  })
})