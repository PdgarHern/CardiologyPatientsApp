class AcceptedController < ApplicationController

    def accepted
        User.accept_invitation!(invitation_token: params[:invitation_token], password: params[:password])
        #render json: { message: "Password changed!." }
        redirect_to "http://" + Rails.application.credentials.development[:frontend_host] + ":" + Rails.application.credentials.development[:frontend_port].to_s
    end 
end
