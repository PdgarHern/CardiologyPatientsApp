# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_02_16_162914) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "answers", force: :cascade do |t|
    t.string "value"
    t.bigint "parameter_id"
    t.bigint "followup_id"
    t.bigint "hospital_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["followup_id"], name: "index_answers_on_followup_id"
    t.index ["hospital_id"], name: "index_answers_on_hospital_id"
    t.index ["parameter_id"], name: "index_answers_on_parameter_id"
  end

  create_table "doctors", force: :cascade do |t|
    t.string "name"
    t.integer "phoneNumber"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "hospital_id"
    t.string "rol"
    t.index ["hospital_id"], name: "index_doctors_on_hospital_id"
    t.index ["user_id"], name: "index_doctors_on_user_id"
  end

  create_table "followups", force: :cascade do |t|
    t.string "startDate"
    t.string "endDate"
    t.bigint "doctor_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "hospital_id", null: false
    t.bigint "patient_id", null: false
    t.bigint "followuptemplate_id", null: false
    t.index ["doctor_id"], name: "index_followups_on_doctor_id"
    t.index ["followuptemplate_id"], name: "index_followups_on_followuptemplate_id"
    t.index ["hospital_id"], name: "index_followups_on_hospital_id"
    t.index ["patient_id"], name: "index_followups_on_patient_id"
  end

  create_table "followuptemplates", force: :cascade do |t|
    t.bigint "hospital_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.index ["hospital_id"], name: "index_followuptemplates_on_hospital_id"
  end

  create_table "followuptemplates_parameters", force: :cascade do |t|
    t.bigint "followuptemplate_id", null: false
    t.bigint "parameter_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["followuptemplate_id"], name: "index_followuptemplates_parameters_on_followuptemplate_id"
    t.index ["parameter_id"], name: "index_followuptemplates_parameters_on_parameter_id"
  end

  create_table "hospitals", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "parameters", force: :cascade do |t|
    t.string "name"
    t.string "kind"
    t.string "frequency"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "hospital_id", null: false
    t.index ["hospital_id"], name: "index_parameters_on_hospital_id"
  end

  create_table "patients", force: :cascade do |t|
    t.string "name"
    t.string "clinicRecord"
    t.string "gender"
    t.string "birthDate"
    t.integer "phoneNumber"
    t.boolean "consentRGPD"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "hospital_id"
    t.string "rol"
    t.index ["hospital_id"], name: "index_patients_on_hospital_id"
    t.index ["user_id"], name: "index_patients_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "rol"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "answers", "followups"
  add_foreign_key "answers", "hospitals"
  add_foreign_key "answers", "parameters"
  add_foreign_key "doctors", "hospitals"
  add_foreign_key "doctors", "users"
  add_foreign_key "followups", "doctors"
  add_foreign_key "followups", "followuptemplates"
  add_foreign_key "followups", "hospitals"
  add_foreign_key "followups", "patients"
  add_foreign_key "followuptemplates", "hospitals"
  add_foreign_key "followuptemplates_parameters", "followuptemplates"
  add_foreign_key "followuptemplates_parameters", "parameters"
  add_foreign_key "parameters", "hospitals"
  add_foreign_key "patients", "hospitals"
  add_foreign_key "patients", "users"
end
