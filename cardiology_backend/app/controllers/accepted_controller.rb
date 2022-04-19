class AcceptedController < ApplicationController

    def accepted
        User.accept_invitation!(invitation_token: params[:invitation_token], password: params[:password])
        render json: { message: "Password changed!." }
    end 
end
