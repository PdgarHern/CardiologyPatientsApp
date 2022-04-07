Rails.application.routes.draw do
  resources :messages
  resources :chats
  resources :answers
  resources :followuptemplates_parameters
  resources :followuptemplates
  resources :hospitals
  resources :followups_patients
  resources :followups_parameters
  resources :followups
  resources :parameters
  resources :patients
  resources :doctors
  default_url_options :host => "localhost:3000"
  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations',
               invitations: 'users/invitations',
              #  omniauth_callbacks: 'user/omniauth_callbacks'
             }

  get '/followuptemplate-last', to: 'followuptemplates#last'
  get '/message-last', to: 'messages#last'

  mount ActionCable.server => "/chat"
end
