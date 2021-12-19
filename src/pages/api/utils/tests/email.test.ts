import Email from '../../modules/email';

const testEmail = 'test@blackhole.postmarkapp.com';
const TemplateModel = {
  name: 'Charles',
  company: 'Test Internal',
  orderNumber: 'XVS24J',
  time: '12pm',
  date: 'January 20th',
  storeURL: 'https://lyncxs.com/store',
  repInfo: {
    name: 'Test Agent',
    id: 'CYD-Z05',
  },
};

const aliasedOptions = {
  From: 'sales@lyncxs.com',
  To: testEmail,
  TemplateAlias: 'onboarding-fr',
  TemplateModel,
  MessageStream: 'outbound',
};

test('creates a valid option hash with locale undefined', () => {
  const email = new Email('sales', 'onboarding');
  expect(email.createEmail({ To: testEmail, TemplateModel })).toEqual(
    aliasedOptions,
  );
});

test('creates a valid option hash with locale defined', () => {
  const email = new Email('sales', 'onboarding');
  const locale = 'FR';
  expect(email.createEmail({ To: testEmail, TemplateModel, locale })).toEqual(
    aliasedOptions,
  );
});
