class ApplicationMailer < ActionMailer::Base
  #default from: Figaro.env.mailer_email_email
  default from: 'from@example.com'
  layout 'mailer'

end
