class InviteController < ApplicationController
    before_action :authenticate_user!
    
    def invite
        User.invite!(email: params[:email])
        render json: { message: "Invitation sent." }
    end 

    # def accept
    #     User.accept_invitation!(invitation_token: params[:invitation_token], password: params[:password])
    #     render json: { message: "Password changed!." }
    # end 
end