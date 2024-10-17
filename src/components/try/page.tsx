'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Download } from 'lucide-react'
import { jsPDF } from 'jspdf'

export default function Component() {
  const [cv, setCV] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
    skills: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCV(prev => ({ ...prev, [name]: value }))
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(20)
    doc.text(cv.name, 20, 20)
    doc.setFontSize(12)
    doc.text(`Email: ${cv.email}`, 20, 30)
    doc.text(`Phone: ${cv.phone}`, 20, 40)
    doc.text('Summary:', 20, 50)
    doc.setFontSize(10)
    const splitSummary = doc.splitTextToSize(cv.summary, 170)
    doc.text(splitSummary, 20, 60)
    doc.setFontSize(12)
    doc.text('Experience:', 20, 80)
    doc.setFontSize(10)
    const splitExperience = doc.splitTextToSize(cv.experience, 170)
    doc.text(splitExperience, 20, 90)
    doc.setFontSize(12)
    doc.text('Education:', 20, 120)
    doc.setFontSize(10)
    const splitEducation = doc.splitTextToSize(cv.education, 170)
    doc.text(splitEducation, 20, 130)
    doc.setFontSize(12)
    doc.text('Skills:', 20, 160)
    doc.setFontSize(10)
    const splitSkills = doc.splitTextToSize(cv.skills, 170)
    doc.text(splitSkills, 20, 170)
    doc.save('cv.pdf')
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-blue-50 to-pink-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Dynamic CV Builder</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <Input
            placeholder="Name"
            name="name"
            value={cv.name}
            onChange={handleChange}
            className="bg-white/50 backdrop-blur-sm"
          />
          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={cv.email}
            onChange={handleChange}
            className="bg-white/50 backdrop-blur-sm"
          />
          <Input
            placeholder="Phone"
            name="phone"
            type="tel"
            value={cv.phone}
            onChange={handleChange}
            className="bg-white/50 backdrop-blur-sm"
          />
          <Textarea
            placeholder="Professional Summary"
            name="summary"
            value={cv.summary}
            onChange={handleChange}
            className="bg-white/50 backdrop-blur-sm"
          />
          <Textarea
            placeholder="Work Experience"
            name="experience"
            value={cv.experience}
            onChange={handleChange}
            className="bg-white/50 backdrop-blur-sm"
          />
          <Textarea
            placeholder="Education"
            name="education"
            value={cv.education}
            onChange={handleChange}
            className="bg-white/50 backdrop-blur-sm"
          />
          <Textarea
            placeholder="Skills"
            name="skills"
            value={cv.skills}
            onChange={handleChange}
            className="bg-white/50 backdrop-blur-sm"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/70 backdrop-blur-md shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-800">{cv.name || 'Your Name'}</h2>
              <p className="text-sm text-gray-600 mb-2">{cv.email}</p>
              <p className="text-sm text-gray-600 mb-4">{cv.phone}</p>
              <h3 className="text-lg font-semibold mb-2 text-blue-700">Professional Summary</h3>
              <p className="text-sm mb-4">{cv.summary}</p>
              <h3 className="text-lg font-semibold mb-2 text-blue-700">Work Experience</h3>
              <p className="text-sm mb-4">{cv.experience}</p>
              <h3 className="text-lg font-semibold mb-2 text-blue-700">Education</h3>
              <p className="text-sm mb-4">{cv.education}</p>
              <h3 className="text-lg font-semibold mb-2 text-blue-700">Skills</h3>
              <p className="text-sm">{cv.skills}</p>
            </CardContent>
          </Card>
          <motion.div
            className="mt-4 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={generatePDF} className="bg-blue-600 hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" /> Download CV
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}