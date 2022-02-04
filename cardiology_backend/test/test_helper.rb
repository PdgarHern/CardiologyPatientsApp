ENV['RAILS_ENV'] ||= 'test'
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors, with: :threads)

  # Returns true if a test user is logged in.
  # def is_logged_in?
  #   !session[:user_id].nil?
  # end

  # Logs in a test user.
  # def log_in_as(user, options = {})
  #   password    = options[:password]    || 'password'
  #   remember_me = options[:remember_me] || '1'
  #   if integration_test?
  #     post login_path, session: { email:       user.email,
  #                                 password:    password,
  #                                 remember_me: remember_me }
  #   else
  #     session[:user_id] = user.id
  #   end
  # end

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end
