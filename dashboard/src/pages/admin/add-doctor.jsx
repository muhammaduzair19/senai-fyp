import React, { useState } from "react"
import { useAdminContext } from "../../context/admin-context"
import { toast } from "react-toastify"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload } from "lucide-react"

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [experience, setExperience] = useState("1 Years")
    const [fees, setFees] = useState("")
    const [about, setAbout] = useState("")
    const [speciality, setSpeciality] = useState("general-physician")
    const [degree, setDegree] = useState("")
    const [address, setAddress] = useState("")

    const { backendUrl, atoken } = useAdminContext()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            if (!docImg) {
                return toast.error("Image not selected")
            }
            const formData = new FormData()
            formData.append("image", docImg)
            formData.append("name", name)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("experience", experience)
            formData.append("fees", fees)
            formData.append("about", about)
            formData.append("speciality", speciality)
            formData.append("degree", degree)
            formData.append("address", address)

            const { data } = await axios.post(
                backendUrl + "/admin/add-doctor",
                formData,
                { headers: { atoken } }
            )
            if (data.success) {
                toast.success(data.message)
                // Reset form
                setDocImg(null)
                setName("")
                setEmail("")
                setPassword("")
                setFees("")
                setAbout("")
                setDegree("")
                setAddress("")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.")
            console.error(error)
        }
    }

    return (
        <ScrollArea className="h-[calc(100vh-4rem)] px-4 py-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-green-800">Add Doctor</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmitHandler} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Label htmlFor="docImage" className="cursor-pointer">
                                {docImg ? (
                                    <img
                                        src={URL.createObjectURL(docImg)}
                                        alt="Doctor"
                                        className="w-24 h-24 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                                        <Upload className="w-8 h-8 text-green-600" />
                                    </div>
                                )}
                            </Label>
                            <Input
                                id="docImage"
                                type="file"
                                className="hidden"
                                onChange={(e) => setDocImg(e.target.files?.[0] || null)}
                            />
                            <span className="text-sm text-green-600">Upload Doctor Picture</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Doctor Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Doctor Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="experience">Experience</Label>
                                <Select value={experience} onValueChange={setExperience}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select experience" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((year) => (
                                            <SelectItem key={year} value={`${year} Years`}>
                                                {year} Years
                                            </SelectItem>
                                        ))}
                                        <SelectItem value="10+ Years">10+ Years</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fees">Fees</Label>
                                <Input
                                    id="fees"
                                    type="number"
                                    value={fees}
                                    onChange={(e) => setFees(e.target.value)}
                                    placeholder="Fees"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="speciality">Speciality</Label>
                                <Select value={speciality} onValueChange={setSpeciality}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select speciality" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="general-physician">General Physician</SelectItem>
                                        <SelectItem value="gynecologist">Gynecologist</SelectItem>
                                        <SelectItem value="dermatologist">Dermatologist</SelectItem>
                                        <SelectItem value="neurologist">Neurologist</SelectItem>
                                        <SelectItem value="gastroenterologist">Gastroenterologist</SelectItem>
                                        <SelectItem value="pediatricians">Pediatricians</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="degree">Education</Label>
                                <Input
                                    id="degree"
                                    value={degree}
                                    onChange={(e) => setDegree(e.target.value)}
                                    placeholder="Education"
                                    required
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Address"
                                    required
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="about">About Doctor</Label>
                                <Textarea
                                    id="about"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    placeholder="Write about doctor"
                                    rows={5}
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                            Add Doctor
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </ScrollArea>
    )
}

export default AddDoctor