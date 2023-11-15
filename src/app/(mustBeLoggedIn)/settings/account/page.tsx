import fetchCurrentUser from "@/app/api/fetchCurrentUser";
import ProfileForm from "./ProfileForm";
export default async function SettingsPage() {
    const user = await fetchCurrentUser();

    return <ProfileForm user={user} />;
}
