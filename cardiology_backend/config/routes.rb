Rails.application.routes.draw do
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
             
end
