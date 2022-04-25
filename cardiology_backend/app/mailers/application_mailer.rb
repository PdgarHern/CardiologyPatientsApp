class ApplicationMailer < ActionMailer::Base
  default from: Figaro.env.mailer_email_email
  layout 'mailer'

end
