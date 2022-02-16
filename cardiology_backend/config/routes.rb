Rails.application.routes.draw do
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
               registrations: 'users/registrations'
             }

  get '/followuptemplate-last', to: 'followuptemplates#last'
  get '/check-token', to: 'token#check_token'
end
