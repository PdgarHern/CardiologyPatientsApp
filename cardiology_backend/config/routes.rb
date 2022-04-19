Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations',
               invitations: 'users/invitations',
              #  omniauth_callbacks: 'user/omniauth_callbacks'
             }
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
  

  get '/followuptemplate-last', to: 'followuptemplates#last'
  get '/message-last', to: 'messages#last'
  post '/invite', to: 'invite#invite'
  post '/invite/accept', to: 'invite#accept'
  get '/accept', to: 'accept#accept'
  post '/accepted', to: 'accepted#accepted'

  mount ActionCable.server => "/chat"
end
